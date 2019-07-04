import { Router, Request, Response } from 'express'
import AreaModel from '../../models/area.model'
import { error500 } from '../../global/errors'

const AreaRoute = Router()

AreaRoute.get( '/', ( req: Request, res: Response ) => {



    AreaModel.find( { 'status': 'active' } ).sort('name')
    .exec( ( err: any, data: any ) => {
        if( err ) {
            return res.status( 500 ).json( { message: error500, err } )
        }

        res.status( 200 ).json( { data } )
    })
})


AreaRoute.post( '/',  ( req: Request, res: Response ) => {


    const model = new AreaModel({
        name: req.body.name,
        addedBy: req.body.user
    })

    model.save( ( err: any, saved: any ) => {
        
        if( err ) {
            return res.status( 500 ).json({
                message: error500,
                error: err[ 'errors' ][ 'name' ][ 'message' ]
            })
        }
        res.status( 200 ).json( { message: `Se insertó correctamente el área ${ saved.name }` } )
    })
})

AreaRoute.put('/:id', ( req: Request, res: Response ) => {

    const id: String   = req.params.id,
          user: String = req.body.user,
          data: Array<any>  = req.body.data.split(',')

    let obj: any = {}

        obj[ data[0] ] = data[1]
        obj[ '$push' ] = { modification: { user, updated: data } }
    AreaModel.findByIdAndUpdate( id, obj, ( err: any, up: any ) => {

        if( err ) {
            return res.status( 500 ).json({
                message: error500,
                error: err
            })
        }
        res.status( 200 ).json( { message: `Se actualizó correctamente el área` } )

    })
})


export default AreaRoute