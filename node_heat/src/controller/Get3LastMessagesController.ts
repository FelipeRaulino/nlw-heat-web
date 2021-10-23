import { NextFunction, Request, Response } from "express";

import { Get3LastMessagesService } from "../services/Get3LastMessagesService";

class Get3LastMessagesController{
  async handle(request: Request, response: Response, next: NextFunction){
    const service = new Get3LastMessagesService();
    
    const result = await service.execute();

    return response.json(result);
  }
}
export { Get3LastMessagesController }