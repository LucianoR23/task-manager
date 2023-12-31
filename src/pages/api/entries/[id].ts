import { db } from '@/database'
import { Entry, IEntry } from '@/models'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = | { message: string } | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    if( !mongoose.isValidObjectId( id ) ){
        return res.status(400).json({ message: 'The ID is not valid ' + id })
    }
    
    switch ( req.method ) {
        case 'PUT':
            return updateEntry( req, res )
        
        case 'GET':
            return getEntry( req, res )

        case 'DELETE':
            return deleteEntry( req, res )
            
        default:
            return res.status(400).json({ message: 'Method does not exist'})
    }

}

const deleteEntry =async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query

    await db.connect()

    const entryToDelete = await Entry.findById( id )

    if( !entryToDelete ){
        await db.disconnect()
        return res.status(400).json({ message: 'There is no entry with that ID'})
    }

    try {
        await Entry.findByIdAndDelete( id )
        await db.disconnect()
        res.status(200).json({ message: "The task was successfully deleted" })
    } catch (error: any) {
        console.log(error)
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message })
    }

}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query

    await db.connect()

    const entryToUpdate = await Entry.findById( id )

    if( !entryToUpdate ){
        await db.disconnect()
        return res.status(400).json({ message: 'There is no entry with that ID'})
    }

    const { description = entryToUpdate.description, status = entryToUpdate.status, createdAt = entryToUpdate.createdAt } = req.body

    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status, createdAt }, { runValidators: true, new: true } )
        // entryToUpdate.description = description
        // entryToUpdate.status = status
        // await entryToUpdate.save()
        await db.disconnect()
        res.status(200).json( updatedEntry! )
    } catch (error: any) {
        console.log(error)
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message })
    }
}

const getEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query

    await db.connect()
    const entryToGet = await Entry.findById( id )
    await db.disconnect()

    if( !entryToGet ){
        return res.status(400).json({ message: 'There is no entry with the ID' + id })
    }
    
    res.status(200).json( entryToGet )

}