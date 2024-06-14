import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { DataSource } from 'typeorm';



export const databaseProviders = [
  {
    // provide: 'DATA_SOURCE',
    // useFactory: async () => {
    //   const dataSource = new DataSource({
    //     type: 'postgres',
    //     host: process.env.HOST_DB,
    //     port: +process.env.POST_DB,
    //     username: process.env.USER_DB,
    //     password: process.env.USER_PASSWORD_DB,
    //     database: process.env.NAME_DB,
    //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //   });

    //   return dataSource.initialize();
    // },


     provide: 'DATA_SOURCE',
        imports:[EnvModule],
        inject:[EnvService],

     useFactory: async (envService: EnvService) => {
       const dataSource = new DataSource({
         type: 'postgres',
         host: envService.get("HOST_DB"),
         port: envService.get("PORT_DB"),
         username: envService.get("USER_DB"),
        password:  envService.get("USER_PASSWORD_DB"),
         database: envService.get("NAME_DB"),
         entities: [__dirname + '/../**/*.entity{.ts,.js}'],
           synchronize: true,
       });

       return dataSource.initialize();
     },



/*
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: '5.185.3.151',//change
        port: 5432,
        username: 'postgres',
        password: 'a',
        database: 'website',*/
   //     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
   //     synchronize: true,
   //   });

   //   return dataSource.initialize();
   // },
  },
];
