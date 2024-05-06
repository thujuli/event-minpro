import { NextFunction, Request, Response } from 'express';
import { EventQuery } from '@/types/event.type';
import { EventService } from '@/services/event.service';
export class EventController {
    public async getEvents (req:Request, res:Response, next:NextFunction) {
        try {
            const query = req.query as EventQuery
     
            const response = await EventService.getEvents(query)
            return res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }
    public async getEventsBySearch (req:Request, res:Response, next:NextFunction){
        try {
            const query = req.query as EventQuery

            const response = await EventService.getEventsBySearch(query)
            return res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }
    public async getEventById (req:Request, res:Response, next:NextFunction){
        try {
            const params = req.params as EventQuery

            const response = await EventService.getEventById(params)
            return res.status(200).send(response)
        } catch (error) {
            next(error)
        }
    }
}