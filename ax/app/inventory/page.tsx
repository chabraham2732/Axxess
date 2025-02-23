"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search } from "lucide-react"
import { AddItemModal } from "@/components/add-item-modal"

// This would typically come from an API or database
const initialInventory = [
  { id: 1, name: "Disposable Gloves", quantity: 500, defaultQuantity: 1000 },
  { id: 2, name: "Surgical Masks", quantity: 200, defaultQuantity: 500 },
  { id: 3, name: "Hand Sanitizer", quantity: 50, defaultQuantity: 100 },
  { id: 4, name: "Syringes", quantity: 1000, defaultQuantity: 2000 },
  { id: 5, name: "Bandages", quantity: 300, defaultQuantity: 500 },
]

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory)
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredInventory, setFilteredInventory] = useState(initialInventory)

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase()
    const filtered = inventory.filter((item) => item.name.toLowerCase().includes(lowercasedQuery))
    setFilteredInventory(filtered)
  }, [inventory, searchQuery])

  const handleAddItem = (newItem: any) => {
    const existingItemIndex = inventory.findIndex((item) => item.name.toLowerCase() === newItem.name.toLowerCase())

    if (existingItemIndex !== -1) {
      // Update existing item
      const updatedInventory = [...inventory]
      updatedInventory[existingItemIndex].quantity += newItem.quantity
      setInventory(updatedInventory)
    } else {
      // Add new item
      setInventory([...inventory, { ...newItem, id: inventory.length + 1 }])
    }

    setIsAddItemModalOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
          <Button onClick={() => setIsAddItemModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Current Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Default Quantity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.defaultQuantity}</TableCell>
                    <TableCell>
                      {item.quantity < item.defaultQuantity * 0.3 ? (
                        <span className="text-red-500 font-semibold">Low Stock</span>
                      ) : item.quantity < item.defaultQuantity * 0.6 ? (
                        <span className="text-yellow-500 font-semibold">Medium Stock</span>
                      ) : (
                        <span className="text-green-500 font-semibold">Good Stock</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <AddItemModal isOpen={isAddItemModalOpen} onClose={() => setIsAddItemModalOpen(false)} onSubmit={handleAddItem} />
    </div>
  )
}

