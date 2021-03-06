import Axios from 'axios';
import OneCare from '../../config/host'

export default class Http {
    
    constructor(token = ''){
        this.req = Axios.create({
            baseURL: OneCare.aihma,
        })

        if(token != '') this.req.defaults.headers.common['Authorization'] = 'bearer '+ token
    }
}
