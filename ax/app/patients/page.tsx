"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search } from "lucide-react"
import { AddPatientModal } from "@/components/add-patient-modal"

// This would typically come from an API or database
const initialPatients = [
  {
    PID: 1,
    P_Name: "John Smith",
    DOB: "1979-05-15",
    SSN: 123456789,
    Address: "123 Main St",
    Zipcode: 12345,
    State_Abv: "NY",
    phone_num: "5551234567",
  },
  {
    PID: 2,
    P_Name: "Sarah Johnson",
    DOB: "1985-08-20",
    SSN: 987654321,
    Address: "456 Elm St",
    Zipcode: 67890,
    State_Abv: "CA",
    phone_num: "5559876543",
  },
  // Add more patient data as needed
]

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients)
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPatients, setFilteredPatients] = useState(initialPatients)

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase()
    const filtered = patients.filter(
      (patient) =>
        patient.P_Name.toLowerCase().includes(lowercasedQuery) ||
        patient.PID.toString().includes(lowercasedQuery) ||
        patient.phone_num.includes(lowercasedQuery),
    )
    setFilteredPatients(filtered)
  }, [patients, searchQuery])

  const handleAddPatient = (newPatient: any) => {
    const newPID = Math.max(...patients.map((p) => p.PID)) + 1
    setPatients([...patients, { ...newPatient, PID: newPID }])
    setIsAddPatientModalOpen(false)
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
          <h2 className="text-3xl font-bold tracking-tight">Patient List</h2>
          <Button onClick={() => setIsAddPatientModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Patient
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>State</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.PID} className="cursor-pointer hover:bg-muted/50">
                    <TableCell>{patient.PID}</TableCell>
                    <TableCell>
                      <Link href={`/patients/${patient.PID}`} className="hover:underline">
                        {patient.P_Name}
                      </Link>
                    </TableCell>
                    <TableCell>{patient.DOB}</TableCell>
                    <TableCell>{patient.Address}</TableCell>
                    <TableCell>{patient.phone_num}</TableCell>
                    <TableCell>{patient.State_Abv}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <AddPatientModal
        isOpen={isAddPatientModalOpen}
        onClose={() => setIsAddPatientModalOpen(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  )
}

