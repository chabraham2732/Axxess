"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { QrScanner } from "@/components/qr-scanner"
import { ArrowLeft } from "lucide-react"

interface AddItemModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function AddItemModal({ isOpen, onClose, onSubmit }: AddItemModalProps) {
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [defaultQuantity, setDefaultQuantity] = useState("")
  const [isScanning, setIsScanning] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, quantity: Number.parseInt(quantity), defaultQuantity: Number.parseInt(defaultQuantity) })
    // Reset form
    setName("")
    setQuantity("")
    setDefaultQuantity("")
  }

  const handleScan = (result: string) => {
    // Assuming the QR code contains data in the format: "name,quantity,defaultQuantity"
    const [scannedName, scannedQuantity, scannedDefaultQuantity] = result.split(",")
    setName(scannedName)
    setQuantity(scannedQuantity)
    setDefaultQuantity(scannedDefaultQuantity)
    setIsScanning(false)
  }

  const handleBackFromScanner = () => {
    setIsScanning(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Item</DialogTitle>
        </DialogHeader>
        {isScanning ? (
          <div className="space-y-4">
            <QrScanner onScan={handleScan} onError={(error) => console.error(error)} />
            <Button type="button" variant="outline" onClick={handleBackFromScanner} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Manual Input
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="defaultQuantity" className="text-right">
                  Default Quantity
                </Label>
                <Input
                  id="defaultQuantity"
                  type="number"
                  value={defaultQuantity}
                  onChange={(e) => setDefaultQuantity(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsScanning(true)}>
                Scan QR Code
              </Button>
              <Button type="submit">Add Item</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

