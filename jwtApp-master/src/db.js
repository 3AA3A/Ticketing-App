// const calculateAge = birthdate =>
//     Math.floor((new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))

const toJavaString = date => {
    // console.log('date', date)
    return date.toISOString().replace('T', ' ').replace('Z', '')
}


const getJwtUser =  () => sessionStorage.getItem("jwtUser") ? JSON.parse(sessionStorage.getItem("jwtUser")) : null
const setJwtUser = user => user ? sessionStorage.setItem("jwtUser", JSON.stringify(user)) : sessionStorage.removeItem("jwtUser")

const authFetch = (url, options) => {
    const jwtUser = getJwtUser()
    if (jwtUser) {
        options = options || {}
        options.headers = options.headers || {}
        options.headers.Authorization = `Bearer ${jwtUser.token}`
    }
    return fetch(url, options)
}

const uploadImage = async (imageFile, name) => {
    console.log('imageFile object', imageFile)
    const body = new FormData()
    body.append('file', imageFile, name)
    const result = await authFetch('/images', {
        method: 'POST',
        body
    })
    console.log('uploadImage result', result)
    return result
}

const email = async (to, subject, text) => {
    const result = await authFetch('/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            to,
            subject,
            text
        })
    })
    console.log('email result', result)
    return result
}

class DB {

    constructor(table) {
        this.table = table
    }


    async create(set, item) {
        console.log(item)
        // const response = 
        await authFetch(`/${this.table}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            }
        )
        // console.log('create response', response)
        set(await this.findAll())
    }

    async remove(set, id) {
        // const response = 
        await authFetch(`/${this.table}/${id}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            }
        )
        // console.log('response', response)
        set(await this.findAll())
    }

    async update(set, item) {
        // const response = 
        await authFetch(`/${this.table}/${item.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            }
        )
        // console.log('response', response)
        set(await this.findAll())
    }

    reformatOne(item) {
        // console.log('reformatOne in', item)
        if (item) {
            const { _links, ...rest } = item
            const id = _links.self.href.split(`${this.table}/`)[1]
            item = { id, ...rest }
            // console.log('reformatOne out', item)
        }
        return item
    }

    reformatAll(items) {
        // console.log('reformatAll in', items)
        items = items._embedded[this.table].map(item => this.reformatOne(item))
        // console.log('reformatAll out', items)
        return items
    }

    async find(query) {
        // access the server through url, issuing GET request
        // for url: http://localhost:8080/registers (for example)
        const response = await authFetch(`/${this.table}/${query}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        // console.log('response', response)
        if (response.ok) {
            const json = await response.json()
            // console.log('json', json)
            return json
        }
        else {
            return undefined
        }
    }

    async findAll() {
        return this.reformatAll(await this.find(""))
    }

    async findOne(id) {
        return this.reformatOne(await this.find(id))
    }
}

class Users extends DB {

    constructor() {
        super("users")
    }

    async findByNameContains(name) {
        return this.reformatAll(await this.find(`search/findByNameContains?name=${name}`))
    }

    async findByIdContainsAndNameContainsAndAddressContainsAndRoleContains(id, name, address, role) {
        return this.reformatAll(await this.find(`search/findByIdContainsAndNameContainsAndAddressContainsAndRoleContains?id=${id}&name=${name}&address=${address}&role=${role}`))
    }

}

class Events extends DB {
    constructor() {
        super("events")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, startdate: new Date(item.startdate), enddate: new Date(item.enddate) }
        return item
    }

    async findByGenreId(id) {
        return this.reformatAll(await this.find(`search/findByGenreid?genreid=${id}`))
    }
    async findByVenueId(id) {
        return this.reformatAll(await this.find(`search/findByVenueid?venueid=${id}`))
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }

    /*async filterBy(genre, venue) {
        if (genre > 0 && venue === 0) return this.reformatAll(await this.find(`search/findByGenreid?genreid=${genre}`))
        else if (venue > 0 && genre === 0) return this.reformatAll(await this.find(`search/findByVenueid?venueid=${venue}`))
        else return this.reformatAll(await this.find(`search/findByGenreidAndVenueid?genreid=${genre}&venueid=${venue}`))
    }*/

    async findByNameContaining(name) {
        
        return this.reformatAll(await this.find(`search/findByNameContaining?name=${name}`))
      
    }
    async findByGenreidAndVenueidAndNameContains(genre, venue, name) {
        return this.reformatAll(await this.find(`search/findByGenreidAndVenueidAndNameContains?genreid=${genre}&venueid=${venue}&name=${name}`))
    }
}

class Eventperformer extends DB {
    constructor() {
        super("eventperformers")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, performdate: new Date(item.performdate) }
        return item
    }

    async findbyEventId(id) {
        return this.reformatAll(await this.find(`search/findByEventid?eventid=${id}`))
    }
    async findByPerformerid(id) {
        return this.reformatAll(await this.find(`search/findByPerformerid?performerid=${id}`))
    }
    async findByEventidAndPerformerid(eventid, performerid) {
        return this.reformatAll(await this.find(`search/findByEventidAndPerformerid?eventid=${eventid}&performerid=${performerid}`))
    }
    async findByEventidAndPerformeridAndPerformdateAndPerformtime(eventid, performerid, performdate, time) {
        console.log(typeof(time))
        return this.reformatAll(await this.find(`search/findByEventidAndPerformeridAndPerformdateAndPerformtime?eventid=${1 * eventid}&performerid=${1 * performerid}&performdate=${toJavaString(performdate)}&time=${time}`))
    }
}

class Genres extends DB {
    constructor() {
        super("genres")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByNameContainsAndDescContains(name, desc) {
        return this.reformatAll(await this.find(`search/findByNameContainsAndDescContains?name=${name}&desc=${desc}`))
    }
    
}

class Venues extends DB {
    constructor() {
        super("venues")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByNameContainsAndAndCityContainsAndCapacityBetween(name, city, from, to) {
        return this.reformatAll(await this.find(`search/findByNameContainsAndAndCityContainsAndCapacityBetween?name=${name}&city=${city}&from=${from}&to=${to}`))
    }

    async findByImage(image) {
        return this.reformatAll(await this.find(`search/findByImage?image=${image}`))
    }
}

class Performer extends DB {
    constructor() {
        super("performers")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByName(name) {
        return this.reformatAll(await this.find(`search/findByNameContains?name=${name}`))
    }

    async findByImage(image) {
        return this.reformatAll(await this.find(`search/findByImage?image=${image}`))
    }
}

class Products extends DB {

    constructor() {
        super("products")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByNameContaining(name) {
        return this.reformatAll(await this.find(`search/findByNameContaining?name=${name}`))
    }
    async findByEventId(id) {
        return this.reformatAll(await this.find(`search/findByEventid?eventid=${id}`))
    }
    async findByEventidAndLevelid(eventid, levelid) {
        return this.reformatAll(await this.find(`search/findByEventidAndLevelid?eventid=${eventid}&levelid=${levelid}`))
    }

}

class Levels extends DB {
    constructor() {
        super("levels")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }
}

class Carts extends DB {

    constructor() {
        super("carts")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
    async findByCouponid(id) {
        return this.reformatAll(await this.find(`search/findByCouponid?id=${id}`))
    }

    // async findByUseridAndStatusContains(id, status) {
    //     return this.reformatAll(await this.find(`search/findByUseridAndStatusContains?id=${id}&status=${status}`))
    // }

    async findByUserNameContains(name) {
        const users = await db.Users.findByNameContains(name)
        const carts = (await Promise.all(users.map(async user => await this.findByUserid(user.id)))).flat()
        return [...new Set(carts)]
    }

    async findByUseridAndUnpaid(id) {
        return this.reformatOne(await this.find(`search/findByUseridAndStatus?id=${id}&status=unpaid`))
    }

    // async findByUseridAndUnpaid(id) {
    //     return this.reformatAll(await this.find(`search/findByUseridAndStatus?id=${id}&status=unpaid`))
    // }
}

class Cartitems extends DB {

    constructor() {
        super("cartitems")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByProductid(id) {
        return this.reformatAll(await this.find(`search/findByProductid?id=${id}`))
    }
    async findByCartid(id) {
        return this.reformatAll(await this.find(`search/findByCartid?cartid=${id}`))
    }

    async findByCartidAndProductid(cartid, productid) {
        return this.reformatOne(await this.find(`search/findByCartidAndProductid?cartid=${cartid}&productid=${productid}`))
    }

    // async findByCartidAndProductid(cartid, productid) {
    //     return this.reformatAll(await this.find(`search/findByCartidAndProductid?cartid=${cartid}&productid=${productid}`))
    // }

}

class Favoriteperformer extends DB {

    constructor() {
        super("favoriteperformers")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
    async findByPerformerid(id) {
        return this.reformatAll(await this.find(`search/findByPerformerid?performerid=${id}`))
    }
    async findByPerformeridAndUseridContains(performerid, userid) {
        return this.reformatAll(await this.find(`search/findByPerformeridAndUseridContains?performerid=${performerid}&userid=${userid}`))
    }
}

class Favoriteevent extends DB {

    constructor() {
        super("favoriteevents")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
    async findByEventid(id) {
        return this.reformatAll(await this.find(`search/findByEventid?eventid=${id}`))
    }
    async findByEventidAndUserid(eventid, userid) {
        return this.reformatAll(await this.find(`search/findByEventidAndUserid?eventid=${eventid}&userid=${userid}`))
    }
}

class Historyperformer extends DB {

    constructor() {
        super("historyperformers")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
    async findByPerformerid(id) {
        return this.reformatAll(await this.find(`search/findByPerformerid?performerid=${id}`))
    }
}

class Historyevent extends DB {

    constructor() {
        super("historyevents")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
    async findByEventid(id) {
        return this.reformatAll(await this.find(`search/findByEventid?eventid=${id}`))
    }
}

class Generalfeedback extends DB {

    constructor() {
        super("generalfeedbacks")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, datemade: new Date(item.datemade)}
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }

    async findByUseridAndTitleContains(id, title) {
        return this.reformatAll(await this.find(`search/findByUseridAndTitleContains?id=${id}&title=${title}`))
    }

    async findByUserNameContainsAndTitleContains(name, title) {
        const users = await db.Users.findByNameContains(name)
        const feeds = (await Promise.all(users.map(async user => await this.findByUseridAndTitleContains(user.id, title)))).flat()
        return [...new Set(feeds)]
    }

    async findByViewed(view) {
        return this.reformatAll(await this.find(`search/findByViewed?view=${view}`))
    }
}

class Faq extends DB {

    constructor() {
        super("faqs")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id }
        return item
    }

    // async removeMyFaq(id) {
    //     await authFetch(`/${this.table}/${id}`,
    //         {
    //             method: 'DELETE',
    //             headers: { 'Content-Type': 'application/json' }
    //         }
    //     )
    // }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }

    async findByQuestionContains(question) {
        return this.reformatAll(await this.find(`search/findByQuestionContains?question=${question}`))
    }

    async findByUseridAndQuestionContains(id, question) {
        return this.reformatAll(await this.find(`search/findByUseridAndQuestionContains?id=${id}&question=${question}`))
    }
    
}

class Performerreview extends DB {

    constructor() {
        super("performerreviews")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, revdate: new Date(item.revdate) }
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }
    async findByPerformerid(id) {
        return this.reformatAll(await this.find(`search/findByPerformerid?performerid=${id}`))
    }

    async findByReviewContainsAndRevdateBetweenAndUseridAndPerformerid(review, from, to, userid, performerid) {
        return this.reformatAll(await this.find(`search/findByReviewContainsAndRevdateBetweenAndUseridAndPerformerid?review=${review}&from=${toJavaString(from)}&to=${toJavaString(to)}&userid=${userid}&performerid=${performerid}`))
    }

    async findByReviewContainsAndRevdateBetweenAndUserNameContainsAndPerformerid(review, from, to, user, performer) {
        const users = await db.Users.findByNameContains(user)
        const revs = (await Promise.all(users.map(async user => await this.findByReviewContainsAndRevdateBetweenAndUseridAndPerformerid(review, from, to, user.id, performer)))).flat()
        return [...new Set(revs)]
    }
}

class Coupon extends DB {

    constructor() {
        super("coupons")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, datevalid: new Date(item.datevalid)}
        return item
    }

    async findByUserid(id) {
        return this.reformatAll(await this.find(`search/findByUserid?id=${id}`))
    }

    async findByCoupcode(code) {
        return this.reformatAll(await this.find(`search/findByCoupcode?code=${code}`))
    }

    async findByCoupcodeAndDatevalidIsAfter(code, date) {
        return this.reformatAll(await this.find(`search/findByCoupcodeAndDatevalidIsAfter?code=${code}&date=${toJavaString(date)}`))
    }
    
}

class Promotion extends DB {

    constructor() {
        super("promotions")
    }

    reformatOne(item) {
        item = super.reformatOne(item)
        item = { ...item, id: 1 * item.id, datefrom: new Date(item.datefrom), dateto: new Date(item.dateto) }
        return item
    }
    async findByEventid(id) {
        return this.reformatAll(await this.find(`search/findByEventid?eventid=${id}`))
    }

    async findByEventidAndDatefromBeforeAndDatetoAfter(eventid, datef, datet) {
        return this.reformatOne(await this.find(`search/findByEventidAndDatefromBeforeAndDatetoAfter?eventid=${eventid}&datef=${toJavaString(datef)}&datet=${toJavaString(datet)}`))
    }

}

const db = {
    getJwtUser,
    setJwtUser,
    uploadImage,
    email,
    Products: new Products(),
    Users: new Users(),
    Carts: new Carts(),
    Coupon: new Coupon(),
    Promotion: new Promotion(),
    Cartitems: new Cartitems(),
    Events: new Events(),
    Genres: new Genres(),
    Venues: new Venues(), 
    Performer: new Performer(), 
    Levels: new Levels(),
    Favoriteperformer: new Favoriteperformer(), 
    Favoriteevent: new Favoriteevent(),
    Historyperformer: new Historyperformer(), 
    Historyevent: new Historyevent(),
    Generalfeedback: new Generalfeedback(),
    Faq: new Faq(),
    Performerreview: new Performerreview(),
    Eventperformer: new Eventperformer()
}

export default db