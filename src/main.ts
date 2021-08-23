import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start(): Promise<void> {
  const app: INestApplication = await NestFactory.create(AppModule);

  const config: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
    .setTitle("Employees")
    .setVersion("1.0.0")
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
start();
