import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';


@Controller()
export class AppController {
  constructor() {}

  @Get("/health")
  health(@Res() res : Response) {
    res.status(200).json({
      message : "API is running"
    });
   
  }
}
