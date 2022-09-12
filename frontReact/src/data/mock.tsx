interface participant {
    id: number,
    name: string,
}

const participants: participant[] = [{
    id: 1,
    name: "Ale",
    
}, {
    id: 2,
    name: "Vit",
    
}, {
    id: 3,
    name: "Jess",
    
}, {
    id: 4,
    name: "Joe",
    
}, {
    id: 5,
    name: "Bill",
    
},{
    id: 6,
    name: "Able",
    
}, {
    id: 7,
    name: "Vbit",
    
}, {
    id: 8,
    name: "Jbess",
    
}, {
    id: 9,
    name: "Jboe",
    
}, {
    id: 10,
    name: "Bbill",
    
}]

interface product {
    id: number,
    name: string,
    price: string,
    participants:string[],
    quantity: string
}

const products: product[] = [{
    id: 1,
    name: "Item 1",
    price: "75.00",    
    participants:["Ale","Vit", "Jess", "Joe","Bill","Able","Vbit", "bJess", "bJoe","Bbill"],
    quantity:"1"
}, {
    id: 2,
    name: "Item 2",
    price: "50.00",
    participants:["Ale","Vit", "Jess", "Joe","Bill","Able","Vbit", "bJess", "bJoe","Bbill"],
    quantity:"1"
}, {
    id: 3,
    name: "Item 3",
    price: "45.00",
    participants:["Ale","Vit", "Jess"],
    quantity:"1"
}, {
    id: 4,
    name: "Item 4",
    price: "40.00",
    participants:["Ale","Vit", "Jess", "Joe"],
    quantity:"1"
}, {
    id: 5,
    name: "Item 5",
    price: "30.00",
    participants:["Ale","Vit"],
    quantity:"1"
},{
    id: 1,
    name: "Item 11",
    price: "75.00",    
    participants:["Ale","Vit", "Jess", "Joe","Bill"],
    quantity:"1"
}, {
    id: 2,
    name: "Item 12",
    price: "50.00",
    participants:["Ale","Vit", "Jess", "Joe","Bill"],
    quantity:"1"
}, {
    id: 3,
    name: "Item 13",
    price: "45.00",
    participants:["Ale","Vit", "Jess"],
    quantity:"1"
}, {
    id: 4,
    name: "Item 14",
    price: "40.00",
    participants:["Ale","Vit", "Jess", "Joe"],
    quantity:"1"
}, {
    id: 5,
    name: "Item 15",
    price: "30.00",
    participants:["Ale","Vit"],
    quantity:"1"
}]

export { participants, products }