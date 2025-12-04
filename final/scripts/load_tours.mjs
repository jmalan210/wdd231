export async function loadTours() {
    try {
        const response = await fetch('data/tours.json');
        if (response.ok) {
            const data = await response.json();
            return data.tours;
        
        } else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
        return [];
    }
    
}
