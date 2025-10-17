import Truck from '../../models/Truck.js';
import Route from '../../models/Route.js';



export default{
    id:(p)=> p._id,
    truck: async (p) =>( p.truck ? await Truck.findById(p.truck).lean() : null ),
    route: async (p) => ( p.route ? await Route.findById(p.route).lean() : null )
}
