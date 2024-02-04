import { ServeStaticModuleOptions } from "@nestjs/serve-static";

export const serveStaticModuleConfig: ServeStaticModuleOptions = {
    rootPath: process.env.FILE_PATH
}