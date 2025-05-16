import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { HistoryIcon, PencilIcon, TrashIcon, PlusIcon, PhoneIcon, MailIcon, CakeIcon } from "lucide-react";
import { SetStateAction } from "react";
import { User } from "../types/user";
import { useRouter } from "next/navigation";

type Props = {
  customers: User[];
  handleEditCustomer: (customer: User) => void;
  handleDeleteCustomer: (phone: string) => void;
  setSelectedCustomer: (value: SetStateAction<User | null>) => void;
};

export default function TableCustomers({
  customers,
  handleEditCustomer,
  handleDeleteCustomer,
  setSelectedCustomer,
}: Props) {
  const router = useRouter();

  const handleAddPoints = (customerId: string) => {
    router.push(`/points?customerId=${customerId}`);
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      {/* Desktop Table */}
      <Table className="hidden md:table">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[200px]">Customer</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.phone}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?u=${customer.phone}`}
                      alt={customer.name}
                    />
                    <AvatarFallback>
                      {customer.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    {customer.gender && (
                      <p className="text-sm text-gray-500 capitalize">
                        {customer.gender}
                      </p>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  {customer.email && (
                    <p className="text-sm">{customer.email}</p>
                  )}
                  <p className="font-medium">{customer.phone}</p>
                </div>
              </TableCell>
              <TableCell>
                {customer.points_balance.toLocaleString()} pts
              </TableCell>
              <TableCell>
                <Badge
                  variant={customer.status ? "default" : "outline"}
                  className={
                    customer.status
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {customer.status ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  {customer.birth_date && (
                    <p>
                      Birth:{" "}
                      {new Date(customer.birth_date).toLocaleDateString()}
                    </p>
                  )}
                  {customer.notes && (
                    <p className="text-gray-500 truncate max-w-xs">
                      {customer.notes}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditCustomer(customer)}
                    className="h-8 w-8 p-0 hover:bg-blue-50"
                    aria-label="Edit customer"
                  >
                    <PencilIcon className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCustomer(customer.phone)}
                    className="h-8 w-8 p-0 hover:bg-red-50"
                    aria-label="Delete customer"
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCustomer(customer)}
                    className="h-8 w-8 p-0 hover:bg-gray-50"
                    aria-label="View history"
                  >
                    <HistoryIcon className="h-4 w-4 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddPoints(customer.id)}
                    className="h-8 w-8 p-0 hover:bg-green-50"
                    aria-label="Add points"
                  >
                    <PlusIcon className="h-4 w-4 text-green-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {customers.map((customer) => (
          <div key={customer.phone} className="border rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${customer.phone}`}
                    alt={customer.name}
                  />
                  <AvatarFallback>
                    {customer.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant={customer.status ? "default" : "outline"}
                      className={
                        customer.status
                          ? "bg-green-100 text-green-800 text-xs"
                          : "bg-red-100 text-red-800 text-xs"
                      }
                    >
                      {customer.status ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-sm font-semibold text-gray-600">
                      {customer.points_balance.toLocaleString()} pts
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditCustomer(customer)}
                  className="h-8 w-8 p-0 hover:bg-blue-50"
                  aria-label="Edit customer"
                >
                  <PencilIcon className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAddPoints(customer.id)}
                  className="h-8 w-8 p-0 hover:bg-green-50"
                  aria-label="Add points"
                >
                  <PlusIcon className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <PhoneIcon className="h-4 w-4 text-gray-500" />
                <span>{customer.phone}</span>
              </div>
              {customer.email && (
                <div className="flex items-center gap-2 text-sm">
                  <MailIcon className="h-4 w-4 text-gray-500" />
                  <span>{customer.email}</span>
                </div>
              )}
              {customer.birth_date && (
                <div className="flex items-center gap-2 text-sm">
                  <CakeIcon className="h-4 w-4 text-gray-500" />
                  <span>
                    {new Date(customer.birth_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              {customer.notes && (
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Notes: </span>
                  {customer.notes}
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCustomer(customer)}
                className="text-gray-600 hover:bg-gray-50"
              >
                <HistoryIcon className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteCustomer(customer.phone)}
                className="text-red-600 hover:bg-red-50"
              >
                <TrashIcon className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}