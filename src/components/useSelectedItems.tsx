import { create } from 'zustand'
import Item from '../util/item.ts'

interface _ {
    selectedItems: Item[]
}

const useSelectedItems = create((set: any, get: any) => ({
    selectedItems: [],
    addItem: (item: Item) => set((state: _) =>
        ({ selectedItems: [...new Set([...state.selectedItems, item])]})),
    removeItem: (item: Item) => set((state: _) =>
        ({ selectedItems: [...state.selectedItems].filter(selectedItem => selectedItem !== item) })),
    removeAllItems: () => set(() =>
        ({ selectedItems: [] })),
    containsItem: (item: Item) => get((state: _) =>
        (state.selectedItems.includes(item))),
    getItems: () => get().selectedItems,
    getLastItem: () => get((state: _) =>
        (state.selectedItems[state.selectedItems.length - 1])),
    getLastId: () => get((state: _) =>
        (state.selectedItems[state.selectedItems.length - 1].id)),
    updateItemLabel: (id: string, newLabel: string) => set((state: _) => ({
        selectedItems: state.selectedItems.map(item =>
            item.id === id ? { ...item, label: newLabel } : item)
    })),
    updateItemBackgroundColor: (id: string, newBg: string) => set((state: _) => ({
        selectedItems: state.selectedItems.map(item =>
            item.id === id ? { ...item, backgroundColor: newBg } : item)
    })),
    updateItemForegroundColor: (id: string, newFg: string) => set((state: _) => ({
        selectedItems: state.selectedItems.map(item =>
            item.id === id ? { ...item, foregroundColor: newFg } : item)
    }))
}))

export default useSelectedItems