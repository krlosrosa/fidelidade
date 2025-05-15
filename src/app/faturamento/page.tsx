'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  DollarSign,
  Calendar,
  MoreVertical,
  Loader2,
  Check,
  ArrowRight,
  Search
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Sidebar } from '@/components/sideBar'
import { useMediaQuery } from '@react-hook/media-query'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Subscription = {
  id: string
  customerName: string
  customerEmail: string
  planName: string
  planPrice: number
  status: 'active' | 'canceled' | 'past_due' | 'paused' | 'trialing'
  paymentMethod: string
  nextBillingDate: string
  createdAt: string
  interval: 'month' | 'year'
}

type Plan = {
  id: string
  name: string
  price: number
  interval: 'month' | 'year'
  features: string[]
  mostPopular: boolean
}

export default function SubscriptionManagementPage() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 'sub_1',
      customerName: 'João Silva',
      customerEmail: 'joao@example.com',
      planName: 'Premium Mensal',
      planPrice: 89.9,
      status: 'active',
      paymentMethod: 'Visa **** 4242',
      nextBillingDate: '2023-12-15',
      createdAt: '2023-01-15',
      interval: 'month'
    },
    {
      id: 'sub_2',
      customerName: 'Maria Souza',
      customerEmail: 'maria@example.com',
      planName: 'Básico Anual',
      planPrice: 599.9,
      status: 'active',
      paymentMethod: 'Mastercard **** 5555',
      nextBillingDate: '2024-06-20',
      createdAt: '2023-06-20',
      interval: 'year'
    },
    {
      id: 'sub_3',
      customerName: 'Carlos Oliveira',
      customerEmail: 'carlos@example.com',
      planName: 'Premium Mensal',
      planPrice: 89.9,
      status: 'past_due',
      paymentMethod: 'Visa **** 1234',
      nextBillingDate: '2023-11-30',
      createdAt: '2023-05-10',
      interval: 'month'
    },
  ])

  const [plans] = useState<Plan[]>([
    {
      id: 'plan_basic_month',
      name: 'Básico Mensal',
      price: 49.9,
      interval: 'month',
      features: [
        'Atendimento prioritário',
        '5 agendamentos/mês',
        'Suporte por e-mail'
      ],
      mostPopular: false
    },
    {
      id: 'plan_premium_month',
      name: 'Premium Mensal',
      price: 89.9,
      interval: 'month',
      features: [
        'Atendimento VIP',
        'Agendamentos ilimitados',
        'Suporte 24/7',
        'Desconto em produtos'
      ],
      mostPopular: true
    },
    {
      id: 'plan_basic_year',
      name: 'Básico Anual',
      price: 499.9,
      interval: 'year',
      features: [
        'Atendimento prioritário',
        '5 agendamentos/mês',
        'Suporte por e-mail',
        '2 meses grátis'
      ],
      mostPopular: false
    },
    {
      id: 'plan_premium_year',
      name: 'Premium Anual',
      price: 899.9,
      interval: 'year',
      features: [
        'Atendimento VIP',
        'Agendamentos ilimitados',
        'Suporte 24/7',
        'Desconto em produtos',
        '3 meses grátis'
      ],
      mostPopular: false
    }
  ])

  const [isLoading, setIsLoading] = useState(false)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [view, setView] = useState<'subscriptions' | 'plans'>('subscriptions')

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sub.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Subscription['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case 'canceled':
        return <Badge className="bg-gray-100 text-gray-800">Cancelado</Badge>
      case 'past_due':
        return <Badge className="bg-yellow-100 text-yellow-800">Atrasado</Badge>
      case 'paused':
        return <Badge className="bg-blue-100 text-blue-800">Pausado</Badge>
      case 'trialing':
        return <Badge className="bg-purple-100 text-purple-800">Teste</Badge>
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  const handleCancelSubscription = (subscription: Subscription) => {
    setCurrentSubscription(subscription)
    setIsCancelDialogOpen(true)
  }

  const confirmCancelSubscription = async () => {
    setIsLoading(true)
    try {
      // Simular chamada à API do Stripe
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubscriptions(subscriptions.map(sub => 
        sub.id === currentSubscription?.id ? { ...sub, status: 'canceled' } : sub
      ))
      setIsCancelDialogOpen(false)
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePaymentMethod = async (subscriptionId: string) => {
    console.log(subscriptionId)
    setIsLoading(true)
    try {
      // Simular redirecionamento para o Stripe
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Redirecionando para atualização de método de pagamento...')
    } catch (error) {
      console.error('Erro ao atualizar método de pagamento:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReactivateSubscription = async (subscriptionId: string) => {
    setIsLoading(true)
    try {
      // Simular chamada à API do Stripe
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, status: 'active' } : sub
      ))
    } catch (error) {
      console.error('Erro ao reativar assinatura:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen flex-1 bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-blue-600" />
                Gerenciamento de Assinaturas
              </h1>
              <p className="text-gray-600 mt-1">
                Visualize e gerencie todas as assinaturas dos clientes
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant={view === 'subscriptions' ? 'default' : 'outline'} 
                onClick={() => setView('subscriptions')}
              >
                Assinaturas
              </Button>
              <Button 
                variant={view === 'plans' ? 'default' : 'outline'} 
                onClick={() => setView('plans')}
              >
                Planos Disponíveis
              </Button>
            </div>
          </div>

          {view === 'subscriptions' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Assinaturas Ativas</p>
                        <p className="text-2xl font-bold">
                          {subscriptions.filter(s => s.status === 'active').length}
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-green-100 text-green-600">
                        <Check className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Receita Mensal</p>
                        <p className="text-2xl font-bold">
                          {formatCurrency(
                            subscriptions
                              .filter(s => s.status === 'active' && s.interval === 'month')
                              .reduce((sum, sub) => sum + sub.planPrice, 0)
                          )}
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                        <DollarSign className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Renovações Hoje</p>
                        <p className="text-2xl font-bold">
                          {subscriptions.filter(s => 
                            s.nextBillingDate === new Date().toISOString().split('T')[0]
                          ).length}
                        </p>
                      </div>
                      <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                        <Calendar className="h-5 w-5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="md:col-span-3">
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
                
                <Card>
                  <CardContent className="p-4">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos status</SelectItem>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="canceled">Cancelado</SelectItem>
                        <SelectItem value="past_due">Atrasado</SelectItem>
                        <SelectItem value="paused">Pausado</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-0">
                  {filteredSubscriptions.length === 0 ? (
                    <div className="text-center py-12">
                      <CreditCard className="h-10 w-10 mx-auto text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">
                        Nenhuma assinatura encontrada
                      </h3>
                      <p className="mt-2 text-gray-600">
                        Não há assinaturas correspondentes aos filtros selecionados
                      </p>
                    </div>
                  ) : isMobile ? (
                    <div className="divide-y">
                      {filteredSubscriptions.map((sub) => (
                        <div key={sub.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{sub.customerName}</p>
                              <p className="text-sm text-gray-600">{sub.planName}</p>
                            </div>
                            {getStatusBadge(sub.status)}
                          </div>
                          
                          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <p className="text-gray-500">Valor</p>
                              <p>{formatCurrency(sub.planPrice)}/{sub.interval === 'month' ? 'mês' : 'ano'}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Próxima cobrança</p>
                              <p>{formatDate(sub.nextBillingDate)}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Pagamento</p>
                              <p>{sub.paymentMethod}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Desde</p>
                              <p>{formatDate(sub.createdAt)}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem 
                                  onClick={() => handleUpdatePaymentMethod(sub.id)}
                                  disabled={sub.status !== 'active'}
                                >
                                  Atualizar pagamento
                                </DropdownMenuItem>
                                {sub.status === 'active' ? (
                                  <DropdownMenuItem 
                                    onClick={() => handleCancelSubscription(sub)}
                                    className="text-red-600"
                                  >
                                    Cancelar assinatura
                                  </DropdownMenuItem>
                                ) : sub.status === 'canceled' ? (
                                  <DropdownMenuItem 
                                    onClick={() => handleReactivateSubscription(sub.id)}
                                  >
                                    Reativar assinatura
                                  </DropdownMenuItem>
                                ) : null}
                              </DropdownMenuContent>
                            </DropdownMenu>
                            
                            {sub.status === 'past_due' && (
                              <Button 
                                variant="default" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => handleUpdatePaymentMethod(sub.id)}
                              >
                                Regularizar
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Plano</TableHead>
                          <TableHead>Valor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Pagamento</TableHead>
                          <TableHead>Próxima cobrança</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSubscriptions.map((sub) => (
                          <TableRow key={sub.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{sub.customerName}</p>
                                <p className="text-sm text-gray-600">{sub.customerEmail}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p>{sub.planName}</p>
                              <p className="text-sm text-gray-600">
                                {sub.interval === 'month' ? 'Mensal' : 'Anual'}
                              </p>
                            </TableCell>
                            <TableCell>
                              {formatCurrency(sub.planPrice)}/{sub.interval === 'month' ? 'mês' : 'ano'}
                            </TableCell>
                            <TableCell>{getStatusBadge(sub.status)}</TableCell>
                            <TableCell>{sub.paymentMethod}</TableCell>
                            <TableCell>{formatDate(sub.nextBillingDate)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem 
                                      onClick={() => handleUpdatePaymentMethod(sub.id)}
                                      disabled={sub.status !== 'active'}
                                    >
                                      Atualizar pagamento
                                    </DropdownMenuItem>
                                    {sub.status === 'active' ? (
                                      <DropdownMenuItem 
                                        onClick={() => handleCancelSubscription(sub)}
                                        className="text-red-600"
                                      >
                                        Cancelar assinatura
                                      </DropdownMenuItem>
                                    ) : sub.status === 'canceled' ? (
                                      <DropdownMenuItem 
                                        onClick={() => handleReactivateSubscription(sub.id)}
                                      >
                                        Reativar assinatura
                                      </DropdownMenuItem>
                                    ) : null}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                
                                {sub.status === 'past_due' && (
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => handleUpdatePaymentMethod(sub.id)}
                                  >
                                    Regularizar
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={plan.mostPopular ? 'ring-2 ring-blue-500' : ''}
                >
                  <CardHeader>
                    <CardTitle className="flex justify-between">
                      <span>{plan.name}</span>
                      {plan.mostPopular && (
                        <Badge className="bg-blue-100 text-blue-800">Popular</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(plan.price)}
                      </span>
                      <span className="text-gray-600">/{plan.interval === 'month' ? 'mês' : 'ano'}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full mt-6">
                      Selecionar Plano
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Subscription Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar assinatura</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar a assinatura de {currentSubscription?.customerName}?
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              O cliente perderá acesso aos benefícios imediatamente. Esta ação não pode ser desfeita.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)}>
              Voltar
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmCancelSubscription}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              Confirmar Cancelamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}