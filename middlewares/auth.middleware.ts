import jwt from 'jsonwebtoken'
import { SEED } from '../global/environment'
import { Request, Response } from 'express'

export const auth = ( req: Request, res: Response, next: any ) => {
    let token = req.params.token
    jwt.verify( token, SEED, ( err: any, dec: any ) => {

        if( err ) {
            return res.status(401).json({
                response: false, err
            })
        }
        
        next()
    })
}