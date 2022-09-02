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
    
},]

interface product {
    id: number,
    name: string,
    value: number,
    participants:string[]
}



const products: product[] = [{
    id: 1,
    name: "Item 1",
    value: 75.00,    
    participants:["Ale","Vit", "Jess", "Joe","Bill"]
}, {
    id: 2,
    name: "Item 2",
    value: 50.00,
    participants:["Ale","Vit", "Jess", "Joe","Bill"]
}, {
    id: 3,
    name: "Item 3",
    value: 45.00,
    participants:["Ale","Vit", "Jess"]
}, {
    id: 4,
    name: "Item 4",
    value: 40.00,
    participants:["Ale","Vit", "Jess", "Joe"]
}, {
    id: 5,
    name: "Item 5",
    value: 30.00,
    participants:["Ale","Vit"]
},]

export { participants, products }