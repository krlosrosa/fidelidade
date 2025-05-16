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
import { HistoryIcon, PencilIcon, TrashIcon } from "lucide-react";
import { SetStateAction } from "react";
import { User } from "../types/user";

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
  return (
    <div className="rounded-md border">
      <Table>
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
                  >
                    <PencilIcon className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteCustomer(customer.phone)}
                    className="h-8 w-8 p-0 hover:bg-red-50"
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCustomer(customer)}
                    className="h-8 w-8 p-0 hover:bg-gray-50"
                  >
                    <HistoryIcon className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
