import { Router, Request, Response } from 'express'
import UserModel from '../../models/user.model'
import { error500 } from '../../global/errors'


const BossRoute = Router()


BossRoute.get( '/:area', ( req: Request, res: Response ) => {

    const area: String = req.params.area

    UserModel.find( { area, 'status': 'active' } ).sort('name')
    .exec( ( err: any, data: any ) => {
        if( err ) {
            return res.status( 500 ).json( { message: error500, err } )
        }

        res.status( 200 ).json( { data } )
    })
})


export default BossRoute