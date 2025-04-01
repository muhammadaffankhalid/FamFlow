import { supabase } from "./supabase";



export async function createHome(name: string) {
  const { data, error } = await supabase
    .from('homes')
    .insert([{ name }])
    .select();

  if (error) {
    console.error('Error creating home:', error);
    return null;
  }
  return data[0]; // Return the created home
}

export async function getItem(itemID: string) {

  const { data, error } = await supabase
    .from('lists')
    .select(
      `
            id,
            name,
            items(*)
        `,
    )
    .eq('id', itemID)
    .single(); 

  if (error) {
    console.error('Error fetching item:', error);
    return null;
  }
  return data;
}

// function to delete items from list
export async function deleteItem(itemId: string) {
  const { data, error } = await supabase
    .from('items')
    .delete()
    .eq('id', itemId)
    .select();

  if (error) {
    console.error('Error deleting item:', error);
    return null;
  }
  console.log('Item deleted:', data);   
  return data;
}
// function to delete list
export async function deleteList(listId: string) {
  const { data, error } = await supabase
    .from('lists')
    .delete()
    .eq('id', listId)
    .select();
  if (error) {
    console.error('Error deleting list:', error);
    return null;
  }

  return data;
}
// function to update item
export async function updateItem(itemId: string, bought: boolean) {
  const { data, error } = await supabase
    .from('items')
    .update({ bought })
    .eq('id', itemId);
  if (error) {
    console.error('Error updating item:', error);
    return null;
  }
    return data;
}

export async function getlists() {
 const { data, error } = await supabase
  .from("lists")
  .select(`
    id,
    name,
    items( name, quantity,bought )`
  );
  if (error) {
    console.error("Error fetching lists:", error);
    return [];
  }

  return data;
}

export async function getHomeID() {
    const { data, error } = await supabase
      .from('homes')
      .select('id');

      return data;
}

export async function addlistandItems( listTitle:string, items:{name:string,quantity:number,bought:boolean}[],homeId:string) {
    try{
        //add new list
        const { data: listData, error: listError } = await supabase
        .from("lists")
        .insert([{ name: listTitle,home_id:homeId }])
        .select()
        .single();
        if (listError) {
            console.error("Error adding list:", listError);
            return null;
        }
           const listId = listData.id;  
        //add items to the list
        const itemsToInsert = items.map((item) => ({
            list_id: listId,
            name: item.name,
            quantity: item.quantity,
            bought:item.bought,
        }));
        const {error:itemsError} = await supabase
        .from("items")
        .insert(itemsToInsert);
        if (itemsError) {
            console.error("Error adding items:", itemsError);
            return null;
        }
        return {listId,listTitle,items};
    } catch (error) {
        console.error("Error adding list and items:", error);
        return null;
    }
 

}

