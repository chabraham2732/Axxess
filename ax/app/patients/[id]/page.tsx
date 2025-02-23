"use client"

import { useState, useEffect } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Calendar, Edit, Phone, Plus, User } from "lucide-react"
import Link from "next/link"
import { NewVisitationModal } from "@/components/new-visitation-modal"
import { EditPatientModal } from "@/components/edit-patient-modal"

// This would typically come from an API or database
const initialPatientData = {
  PID: 1,
  P_Name: "John Smith",
  DOB: "1979-05-15",
  SSN: 123456789,
  Address: "123 Main St",
  Zipcode: 12345,
  State_Abv: "NY",
  phone_num: "5551234567",
  measurements: {
    Age: 44,
    Sex: 1,
    Weight: 180,
    Height: 70,
  },
  visitations: [
    {
      N_Name: "Dr. Sarah Wilson",
      Date_of_visitation: "2024-02-15",
      Notes: "Routine examination",
      Respiratory_Rate: 16,
      Heart_Rate: 72,
      bp_systolic: 120,
      bp_diastolic: 80,
      Temp: 98,
    },
    {
      N_Name: "Nurse John Davis",
      Date_of_visitation: "2024-01-10",
      Notes: "Follow up for upper respiratory infection",
      Respiratory_Rate: 18,
      Heart_Rate: 76,
      bp_systolic: 118,
      bp_diastolic: 78,
      Temp: 99,
    },
  ],
  medications: [
    {
      Med_Name: "Lisinopril",
      Dosage: 10,
      Unit: "mg",
      Remaining: 30,
      Exp_Date: "2025-06-30",
    },
  ],
}

export default function PatientDetailsPage({ params }: { params: { id: string } }) {
  const [patientData, setPatientData] = useState(initialPatientData)
  const [isNewVisitModalOpen, setIsNewVisitModalOpen] = useState(false)
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false)

  useEffect(() => {
    // Fetch patient data based on the ID
    // This is where you'd typically make an API call
    console.log("Fetching data for patient ID:", params.id)
  }, [params.id])

  const handleNewVisit = (newVisit: any) => {
    // Here you would typically send this data to your backend API
    console.log("New visit:", newVisit)
    // Then update the local state or refetch the patient data
    setIsNewVisitModalOpen(false)
  }

  const handleEditPatient = (updatedPatient: any) => {
    // Here you would typically send this data to your backend API
    console.log("Updated patient:", updatedPatient)
    // Update the local state
    setPatientData((prevData) => ({ ...prevData, ...updatedPatient }))
    setIsEditPatientModalOpen(false)
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
          <div className="flex items-center space-x-4">
            <Link href="/patients">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Patient Details</h2>
          </div>
          <div className="space-x-2">
            <Button onClick={() => setIsEditPatientModalOpen(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Patient
            </Button>
          </div>
        </div>

        {/* Patient information cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Name</div>
                <div>{patientData.P_Name}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Date of Birth</div>
                <div>{patientData.DOB}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">SSN</div>
                <div>{patientData.SSN}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Phone</div>
                <div>{patientData.phone_num}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Address</div>
                <div>{patientData.Address}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Zipcode</div>
                <div>{patientData.Zipcode}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">State</div>
                <div>{patientData.State_Abv}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Measurements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Age</div>
                <div>{patientData.measurements.Age}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Sex</div>
                <div>{patientData.measurements.Sex === 1 ? "Male" : "Female"}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Weight</div>
                <div>{patientData.measurements.Weight} lbs</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Height</div>
                <div>{patientData.measurements.Height} inches</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visitation History */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Visitation History</CardTitle>
            <Button onClick={() => setIsNewVisitModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Visitation
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Doctor/Nurse</TableHead>
                  <TableHead>Vitals</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientData.visitations.map((visit, index) => (
                  <TableRow key={index}>
                    <TableCell>{visit.Date_of_visitation}</TableCell>
                    <TableCell>{visit.N_Name}</TableCell>
                    <TableCell>
                      BP: {visit.bp_systolic}/{visit.bp_diastolic}, HR: {visit.Heart_Rate}, RR: {visit.Respiratory_Rate}
                      , Temp: {visit.Temp}°F
                    </TableCell>
                    <TableCell>{visit.Notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Medications */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Current Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medication</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Remaining</TableHead>
                  <TableHead>Expiration Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientData.medications.map((med, index) => (
                  <TableRow key={index}>
                    <TableCell>{med.Med_Name}</TableCell>
                    <TableCell>
                      {med.Dosage} {med.Unit}
                    </TableCell>
                    <TableCell>{med.Remaining}</TableCell>
                    <TableCell>{med.Exp_Date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <NewVisitationModal
        isOpen={isNewVisitModalOpen}
        onClose={() => setIsNewVisitModalOpen(false)}
        onSubmit={handleNewVisit}
      />
      <EditPatientModal
        isOpen={isEditPatientModalOpen}
        onClose={() => setIsEditPatientModalOpen(false)}
        onSubmit={handleEditPatient}
        patientData={{
          PID: patientData.PID,
          P_Name: patientData.P_Name,
          DOB: patientData.DOB,
          SSN: patientData.SSN,
          Address: patientData.Address,
          Zipcode: patientData.Zipcode,
          State_Abv: patientData.State_Abv,
          phone_num: patientData.phone_num,
        }}
      />
    </div>
  )
}

