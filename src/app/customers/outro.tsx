"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { User } from "./types/user";
import TableCustomers from "./components/tableUsers";
import DialogEditUser from "./components/editUser";
import { AddCliente } from "@/domain/usecases/addClient";
import { useUser } from "@clerk/nextjs";
import { GetClientes } from "@/domain/usecases/getClientes";
import { EditCliente } from "@/domain/usecases/editClient";

type Props = {
  useCase: AddCliente;
  getClients: GetClientes;
  editClient: EditCliente;
};

export default function CustomerLoyaltySystem({
  useCase,
  getClients,
  editClient,
}: Props) {
  // State management
  const [customers, setCustomers] = useState<User[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // Adicionei estado de loading
  console.log(loading)
  // Carrega os clientes ao montar o componente
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        if (user?.id) {
          const clients = await getClients.getClientes({
            tenant_id: user.id,
          });
          setCustomers(clients || []);
        }
      } catch (error) {
        console.error("Failed to fetch clients:", error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [user?.id, getClients]); // Dependências do useEffect

  // Form states
  const [customerForm, setCustomerForm] = useState<
    Omit<User, "tenant_id"> & { phone: string }
  >({
    id: "",
    name: "",
    email: "",
    phone: "",
    points_balance: 0,
    status: true,
    birth_date: new Date().toISOString().split("T")[0],
    gender: null,
    notes: null,
  });

  // Filtered data
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email &&
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      customer.phone.includes(searchTerm)
  );

  // Handlers
  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && selectedCustomer) {
      setCustomers(
        customers.map((c) =>
          c.phone === selectedCustomer.phone
            ? {
                ...customerForm,
                tenant_id: selectedCustomer.tenant_id,
              }
            : c
        )
      );

      await editClient.editClient({
        id: selectedCustomer.id,
        name: customerForm.name,
        phone: customerForm.phone,
        points_balance: customerForm.points_balance,
        status: customerForm.status,
        email: customerForm.email,
        notes: customerForm.notes,
        gender: customerForm.gender,
        birth_date: customerForm.birth_date,
        tenant_id: user?.id || "",
      });
    } else {
      setCustomers([
        ...customers,
        {
          ...customerForm,
          tenant_id: `tenant-${customers.length + 1}`,
        },
      ]);
    }

    await useCase.addClient({
      name: customerForm.name,
      phone: customerForm.phone,
      points_balance: customerForm.points_balance,
      status: customerForm.status,
      email: customerForm.email,
      notes: customerForm.notes,
      gender: customerForm.gender,
      birth_date: customerForm.birth_date,
      tenant_id: user?.id || "",
    });
    resetForms();
    setIsCustomerDialogOpen(false);
  };

  const resetForms = () => {
    setCustomerForm({
      id: "",
      name: "",
      email: "",
      phone: "",
      points_balance: 0,
      status: true,
      birth_date: new Date().toISOString().split("T")[0],
      gender: null,
      notes: null,
    });
    setEditMode(false);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (phone: string) => {
    setCustomers(customers.filter((customer) => customer.phone !== phone));
  };

  const handleEditCustomer = (customer: User) => {
    setCustomerForm({
      id: customer.id,
      name: customer.name,
      email: customer.email || "",
      phone: customer.phone,
      points_balance: customer.points_balance,
      status: customer.status,
      birth_date: customer.birth_date || new Date().toISOString().split("T")[0],
      gender: customer.gender || null,
      notes: customer.notes || null,
    });
    setSelectedCustomer(customer);
    setEditMode(true);
    setIsCustomerDialogOpen(true);
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Customer Loyalty System
        </h1>

        {/* Search and Actions */}
        <div className="flex justify-between items-center mb-6">
          <Input
            placeholder="Search customers by name, email or phone..."
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsCustomerDialogOpen(true);
                setEditMode(false);
              }}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        <TableCustomers
          customers={filteredCustomers}
          handleEditCustomer={handleEditCustomer}
          handleDeleteCustomer={handleDeleteCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />

        {/* Customer Dialog */}
        <DialogEditUser
          editMode={editMode}
          handleCustomerSubmit={handleCustomerSubmit}
          isCustomerDialogOpen={isCustomerDialogOpen}
          setIsCustomerDialogOpen={setIsCustomerDialogOpen}
          setCustomerForm={setCustomerForm}
          customerForm={customerForm}
        />
      </div>
    </div>
  );
}
