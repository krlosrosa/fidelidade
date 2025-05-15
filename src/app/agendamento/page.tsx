'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  CalendarDays,
  Clock,
  Scissors,
  User,
  Phone,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Sidebar } from '@/components/sideBar'
import { useMediaQuery } from '@react-hook/media-query'

type Appointment = {
  id: string
  clientName: string
  clientPhone: string
  service: string
  barber: string
  date: string
  time: string
  duration: number
  status: 'confirmed' | 'pending' | 'canceled' | 'completed'
}

export default function AppointmentsPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filter, setFilter] = useState<'all' | 'today' | 'week' | 'month'>('today')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [expandedAppointment, setExpandedAppointment] = useState<string | null>(null)

  // Mock data - substitua por chamada à API
  useEffect(() => {
    const mockAppointments: Appointment[] = [
      {
        id: '1',
        clientName: 'João Silva',
        clientPhone: '(11) 98765-4321',
        service: 'Corte + Barba',
        barber: 'Carlos',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        duration: 60,
        status: 'confirmed',
      },
      {
        id: '2',
        clientName: 'Marcos Oliveira',
        clientPhone: '(11) 91234-5678',
        service: 'Corte Social',
        barber: 'Ricardo',
        date: new Date().toISOString().split('T')[0],
        time: '11:30',
        duration: 30,
        status: 'pending',
      },
      {
        id: '3',
        clientName: 'Pedro Santos',
        clientPhone: '(11) 99876-5432',
        service: 'Barba Completa',
        barber: 'Carlos',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '14:00',
        duration: 45,
        status: 'confirmed',
      },
      {
        id: '4',
        clientName: 'Lucas Mendes',
        clientPhone: '(11) 92345-6789',
        service: 'Corte + Sobrancelha',
        barber: 'Ricardo',
        date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        time: '16:00',
        duration: 45,
        status: 'confirmed',
      },
      {
        id: '5',
        clientName: 'Antônio Costa',
        clientPhone: '(11) 94567-8910',
        service: 'Corte Infantil',
        barber: 'Carlos',
        date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        time: '09:00',
        duration: 30,
        status: 'pending',
      },
      {
        id: '6',
        clientName: 'Rafael Souza',
        clientPhone: '(11) 95678-9012',
        service: 'Corte + Barba',
        barber: 'Ricardo',
        date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        time: '13:30',
        duration: 60,
        status: 'confirmed',
      },
    ]
    setAppointments(mockAppointments)
  }, [])

  const filteredAppointments = appointments.filter((appt) => {
    // Filtro por período
    const apptDate = new Date(appt.date)
    const today = new Date()
    
    if (filter === 'today' && appt.date !== today.toISOString().split('T')[0]) {
      return false
    }
    if (filter === 'week') {
      const weekEnd = new Date(today)
      weekEnd.setDate(weekEnd.getDate() + 7)
      if (apptDate < today || apptDate > weekEnd) return false
    }
    if (filter === 'month') {
      const monthEnd = new Date(today)
      monthEnd.setMonth(monthEnd.getMonth() + 1)
      if (apptDate < today || apptDate > monthEnd) return false
    }
    
    // Filtro por status
    if (statusFilter !== 'all' && appt.status !== statusFilter) {
      return false
    }
    
    // Filtro por busca
    if (searchTerm && !appt.clientName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    return true
  })

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmado</Badge>
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>
      case 'canceled':
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Concluído</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).replace('.', '')
  }

  const toggleExpandAppointment = (id: string) => {
    setExpandedAppointment(expandedAppointment === id ? null : id)
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (filter === 'today') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    } else if (filter === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    } else if (filter === 'month') {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen flex-1 bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <CalendarDays className="h-6 w-6 mr-2 text-blue-600" />
                Agendamentos
              </h1>
              <p className="text-gray-600 mt-1">
                Visualize e gerencie todos os agendamentos
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button size={isMobile ? "sm" : "default"}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Agendamento
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="md:col-span-3">
              <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => navigateDate('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  <div className="text-center min-w-[200px]">
                    <p className="font-medium">
                      {filter === 'today' && currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      {filter === 'week' && (
                        `Semana ${currentDate.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} - ${new Date(currentDate.getTime() + 6 * 86400000).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })}`
                      )}
                      {filter === 'month' && (
                        currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
                      )}
                      {filter === 'all' && 'Todos os agendamentos'}
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => navigateDate('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Hoje</SelectItem>
                      <SelectItem value="week">Esta semana</SelectItem>
                      <SelectItem value="month">Este mês</SelectItem>
                      <SelectItem value="all">Todos</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos status</SelectItem>
                      <SelectItem value="confirmed">Confirmados</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="canceled">Cancelados</SelectItem>
                      <SelectItem value="completed">Concluídos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar cliente..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {isMobile ? (
            <div className="space-y-3">
              {filteredAppointments.length === 0 ? (
                <Card className="text-center py-8">
                  <CardContent>
                    <CalendarDays className="h-10 w-10 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      Nenhum agendamento encontrado
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Não há agendamentos para o período selecionado
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredAppointments.map((appt) => (
                  <Card key={appt.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleExpandAppointment(appt.id)}
                      >
                        <div>
                          <p className="font-medium">{appt.clientName}</p>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {appt.time} - {appt.duration} min
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(appt.status)}
                          {expandedAppointment === appt.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      
                      {expandedAppointment === appt.id && (
                        <div className="mt-4 pt-4 border-t space-y-3">
                          <div className="flex items-center text-sm">
                            <Scissors className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appt.service}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appt.barber}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appt.clientPhone}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <CalendarDays className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{formatDate(appt.date)}</span>
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            <Button variant="outline" size="sm" className="flex-1">
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              {appt.status === 'confirmed' ? 'Cancelar' : 'Confirmar'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <CalendarDays className="h-10 w-10 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      Nenhum agendamento encontrado
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Não há agendamentos para o período selecionado
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Serviço</TableHead>
                        <TableHead>Barbeiro</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Duração</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.map((appt) => (
                        <TableRow key={appt.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-gray-500" />
                              {appt.clientName}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Scissors className="h-4 w-4 mr-2 text-gray-500" />
                              {appt.service}
                            </div>
                          </TableCell>
                          <TableCell>{appt.barber}</TableCell>
                          <TableCell>{formatDate(appt.date)}</TableCell>
                          <TableCell>{appt.time}</TableCell>
                          <TableCell>{appt.duration} min</TableCell>
                          <TableCell>{getStatusBadge(appt.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="outline" size="sm">
                                {appt.status === 'confirmed' ? 'Cancelar' : 'Confirmar'}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}