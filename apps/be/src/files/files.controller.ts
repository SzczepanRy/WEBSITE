import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService, private authService: AuthService) { }


    @Get('/all')
    getFiles(): { files: string[]; success: boolean } {
        return this.filesService.findFiles();
    }
    //implement auth

    @UseGuards(JwtAuthGuard)
    @Delete('/delete')
    delete(@Query('name') name: string): { success: boolean; message: string } {
        return this.filesService.delete(name);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/deletefolder')
    deleteFolder(@Query('dir') dir: string): {
        success: boolean;
        message: string;
    } {
        console.log(dir);

        return this.filesService.deleteFolder(dir);
    }
    @UseGuards(JwtAuthGuard)
    @Post('addfolder')
    addFolder(@Body() { dir }: { dir: string }): {
        success: boolean;
        message: string;
    } {
        return this.filesService.addFolder(dir);
    }

    //implement auth

    @UseGuards(JwtAuthGuard)
    @Post('/upload')
    @UseInterceptors(
        AnyFilesInterceptor({
            storage: diskStorage({
                destination: '/var/www/html',
                filename: function (req, file, callback) {
                    // console.log(file.originalname);
                    // console.log(file.filename + ' : filepath ');
                    // console.log(file);
                    // console.log(req);

                    callback(null, file.originalname);
                },
            }),
        }),
    )
    uploadFile(
        @UploadedFiles()
        file: Express.Multer.File,
        @Query('dir') dir: string,
    ) {
        console.log(file[0].originalname, dir);

        this.filesService.moveFile(file[0].originalname, dir);
        return file;
    }
}
