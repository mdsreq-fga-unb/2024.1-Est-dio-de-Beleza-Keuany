//import carneAssadaImg from './assets/images/image.png' // Importe a imagem

interface FoodData {
    id: number;
    title: string;
    image: string;
    price: number;
}

// Crie um objeto do tipo FoodData
export const foodItem: FoodData[] = [{
    id: 1234,
    title: 'Carne assada',
    image: 'caracol nervoso', // Use a imagem importada aqui
    price: 5678
}];

console.log(foodItem);



