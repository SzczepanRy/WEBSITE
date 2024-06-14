import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
@Injectable()
export class FilesService {
    findFiles(): { files: string[]; success: boolean } {
        let end = [];
        let basedir = '/';

        const getFiles = (base: string): string[] => {
            let arrArr = fs.readdirSync('/var/www/html' + base, {
                withFileTypes: true,
            });

            let strArr = arrArr.map((dirent) => dirent.name);

            return strArr;
        };
        function readRec(base: string) {
            let res = [];
            // console.log(base + " base");

            let val = fs.readdirSync('/var/www/html' + base, {
                withFileTypes: true,
            });
            let marked = [];

            for (let el of val) {
                if (el.isDirectory()) {
                    if (!marked.includes(el.name)) {
                        marked.push(el.name);
                        readRec(`${base ? `${base}/${el.name}` : el.name}`);
                    } else {
                        res = [...new Set([...res, ...getFiles(base)])];
                        continue;
                    }
                } else {
                    res = [...new Set([...res, ...getFiles(base)])];
                }
            }
            res = res.filter((e) => {
                if (!marked.includes(e)) {
                    return e;
                }
            });

            let obj = {};
            obj[base] = res;

            end.push(obj);
        }
        readRec(basedir);

        return { files: end, success: true };
    }


    //this is for linux

    delete(name: string): { success: boolean; message: string } {
        if (name && fs.existsSync(`/var/www/html/${name}`)) {
            fs.rm(
                `/var/www/html/${name}`,

                (err) => {
                    if (err) {
                        //
                        return {
                            success: false,
                            message: 'removed file faled file does not exisit',
                        };
                    }
                },
            );
            return { success: true, message: 'removed file' };
        } else {
            return { success: false, message: 'removed file faled' };
        }
    }

    deleteFolder(dir: string): { success: boolean; message: string } {
        if (dir && fs.existsSync(`/var/www/html/${dir}`)) {
            fs.rm(`/var/www/html/${dir}`, { recursive: true }, (err) => {
                if (err) {
                }
            });
            return { success: true, message: 'removed file' };
        } else {
            return { success: false, message: 'removed file faled' };
        }
    }
    addFolder(dir: string): { success: boolean; message: string } {
        console.log(dir + 'I hate this ');
        console.log(!fs.existsSync(`/var/www/html/${dir}`));
        try {
            if (dir && !fs.existsSync(`/var/www/html/${dir}`)) {
                fs.mkdirSync(`/var/www/html/${dir}`);
                return { success: true, message: 'added folder' };
            } else {
                return { success: false, message: 'did not add folder' };
            }
        } catch {
            return { success: false, message: 'did not add folder' };
        }
    }
    moveFile(
        name: string,
        newPath: string,
    ): { success: boolean; message: string } {
        try {
            fs.rename(
                `/var/www/html/${name}`,
                `/var/www/html/${newPath}`,
                function (err) {
                    if (err) {
                        return { success: false, message: 'did not add file' };
                    }
                    return { success: true, message: 'added file' };
                },
            );
        } catch {
            return { success: false, message: 'did not add file' };
        }
    }
}
