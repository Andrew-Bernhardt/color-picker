export interface IColorBlock {
    _id: number
    isBlackFont: boolean
    color: string
    votes: number
    __v: string
}

export const preLoad: Array<IColorBlock> = [{
    _id: 0,
    isBlackFont: true,
    color: '',
    votes: 0,
    __v: ''
}]

export const emptyColorBlock: IColorBlock = {
    _id: 0,
    isBlackFont: true,
    color: '#FF',
    votes: 12,
    __v: '0'
}
