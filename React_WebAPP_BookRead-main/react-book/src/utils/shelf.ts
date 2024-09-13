import storage from "@/utils/storage";
import { IBookInfo } from "@/types/book";

export const isShelf = (bookId: string) => {
    let arr:IBookInfo[] = storage.get('shelf') || [];
    let group:Record<string, IBookInfo[]> = storage.get('shelf-group') || {};
    
    const index = arr.findIndex((item) => item.bookId === bookId);
    
    if(index !== -1) {
        return true;
    }

    for(const name in group) {
        if(group.hasOwnProperty(name)){
            const index = group[name].findIndex((item) => item.bookId === bookId)
        
            if(index !== -1) {
                return true;
            }
        }
        
    }

    return false;
}

export const deleteShelf = (books: IBookInfo[]) => {
    let arr: IBookInfo[] = storage.get('shelf') || [];

    books.forEach((book) => {
        const index = arr.findIndex((item) => item.bookId === book.bookId);
        if(index !== -1) {
            arr.splice(index,1);
        }
    })
    storage.set('shelf', arr);

    window.dispatchEvent(new CustomEvent('local-sorage', {detail:{key: 'setlf'}}))
}

export const setShelf = (value: IBookInfo): string => {
    let arr:IBookInfo[] = storage.get('shelf') || [];
    let group:Record<string, IBookInfo[]> = storage.get('shelf-group') || {};

    const index = arr.findIndex((item) => item.bookId === value.bookId);
    
    if(index != -1) {
        arr.splice(index, 1);
        storage.set('shelf', arr);
        return '已从书架中移除';
    }

    for(const name in group) {
        if(group.hasOwnProperty(name)) {
            const index = group[name].findIndex((item) => item.bookId === value.bookId);

            if(index !== -1) {
                group[name].splice(index, 1);

                if(!Object.keys(group[name]).length) {
                    delete group[name];
                }

                storage.set('shelf-group', group);
                return '已从书架中移除';
            }
        }
    }

    arr.unshift(value);
    storage.set('shelf', arr);
    return "已加入书架";
}

export const setGroup = (name: string, books: IBookInfo[], groups: string[]) => {
    let group: Record<string, IBookInfo[]> = storage.get('shelf-group') || {};
    const groupBooks: IBookInfo[] = [];

    groups.forEach((groupName) => {
        groupBooks.push(...group[groupName]);
        delete group[groupName];
    })

    group[name] = group[name] || [];
    group[name] = [...group[name], ...groupBooks, ...books];

    storage.set('shelf-group', group);

    deleteShelf(books);

    window.dispatchEvent(new CustomEvent('local-storage', {detail: {key: 'shelf-group'}}));
    return '已添加至分组';
}