import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";
import { User } from "../types/user";

type Props = {
  isCustomerDialogOpen: boolean;
  setIsCustomerDialogOpen: Dispatch<SetStateAction<boolean>>;
  editMode: boolean;
  handleCustomerSubmit: (e: React.FormEvent) => void;
  customerForm: Omit<User, "tenant_id"> & { phone: string };
  setCustomerForm: Dispatch<SetStateAction<Omit<User, "tenant_id"> & { phone: string }>>;
};

export default function DialogEditCustomer({
  isCustomerDialogOpen,
  editMode,
  setIsCustomerDialogOpen,
  handleCustomerSubmit,
  customerForm,
  setCustomerForm,
}: Props) {
  return (
    <Dialog open={isCustomerDialogOpen} onOpenChange={setIsCustomerDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          <DialogDescription>
            {editMode
              ? "Update customer details below"
              : "Fill in the details for the new customer"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCustomerSubmit}>
          <div className="grid gap-4 py-4">
            {/* Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={customerForm.name}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, name: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>

            {/* Email */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={customerForm.email || ""}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            {/* Phone */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right">
                Phone
              </label>
              <Input
                id="phone"
                value={customerForm.phone}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, phone: e.target.value })
                }
                className="col-span-3"
                required
              />
            </div>

            {/* Points Balance */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="points" className="text-right">
                Points
              </label>
              <Input
                id="points"
                type="number"
                value={customerForm.points_balance}
                onChange={(e) =>
                  setCustomerForm({
                    ...customerForm,
                    points_balance: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
                required
              />
            </div>

            {/* Status */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right">
                Status
              </label>
              <Select
                value={customerForm.status ? "active" : "inactive"}
                onValueChange={(value) =>
                  setCustomerForm({
                    ...customerForm,
                    status: value === "active",
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Birth Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="birthDate" className="text-right">
                Birth Date
              </label>
              <Input
                id="birthDate"
                type="date"
                value={customerForm.birth_date || ""}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, birth_date: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            {/* Gender */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="gender" className="text-right">
                Gender
              </label>
              <Select
                value={customerForm.gender || ""}
                onValueChange={(value) =>
                  setCustomerForm({
                    ...customerForm,
                    gender: value as User["gender"],
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="notes" className="text-right">
                Notes
              </label>
              <Input
                id="notes"
                value={customerForm.notes || ""}
                onChange={(e) =>
                  setCustomerForm({ ...customerForm, notes: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {editMode ? "Update Customer" : "Add Customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}