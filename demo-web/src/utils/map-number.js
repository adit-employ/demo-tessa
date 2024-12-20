import { isEmpty } from '@/utils/is.js'

const numberItems = (items, meta) => {
    if (isEmpty(items)) {
        return []
    }

    if (isEmpty(meta)) {
        return []
    }

    return items.map((item, i) => ({
        ...item,
        no: updateNumber(i, meta)
    }))
}

const updateNumber = (i, meta) => {
    const limit = meta.limit
    const nextLimit = meta.limit * meta.page
    const resultLimit = nextLimit - limit

    return resultLimit + (i + 1)
}

export default numberItems
