"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  HistoryIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  GiftIcon,
  UserIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sideBar";

// Mock data
type User = {
  id: string;
  name: string;
  email: string;
  points: number;
  level: "Bronze" | "Silver" | "Gold" | "Platinum";
  joinDate: string;
};

type PointTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: "earned" | "redeemed" | "adjusted";
};

type Reward = {
  id: string;
  name: string;
  cost: number;
  description: string;
  category: string;
};

const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    points: 1250,
    level: "Gold",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    points: 750,
    level: "Silver",
    joinDate: "2023-03-22",
  },
  {
    id: "3",
    name: "James Smith",
    email: "james@example.com",
    points: 250,
    level: "Bronze",
    joinDate: "2023-05-10",
  },
];

const mockTransactions: PointTransaction[] = [
  {
    id: "t1",
    date: "2023-06-15",
    description: "Purchase #12345",
    amount: 100,
    type: "earned",
  },
  {
    id: "t2",
    date: "2023-06-10",
    description: "Birthday bonus",
    amount: 50,
    type: "earned",
  },
  {
    id: "t3",
    date: "2023-06-05",
    description: "Gift card redemption",
    amount: -200,
    type: "redeemed",
  },
  {
    id: "t4",
    date: "2023-05-28",
    description: "Manual adjustment",
    amount: 150,
    type: "adjusted",
  },
  {
    id: "t5",
    date: "2023-05-20",
    description: "Purchase #12344",
    amount: 75,
    type: "earned",
  },
];

const mockRewards: Reward[] = [
  {
    id: "r1",
    name: "$10 Gift Card",
    cost: 1000,
    description: "Redeemable at any partner store",
    category: "Gift Cards",
  },
  {
    id: "r2",
    name: "Free Shipping",
    cost: 500,
    description: "Free shipping on your next order",
    category: "Shipping",
  },
  {
    id: "r3",
    name: "Premium Content",
    cost: 750,
    description: "Access to exclusive content",
    category: "Digital",
  },
  {
    id: "r4",
    name: "VIP Event Ticket",
    cost: 2000,
    description: "Ticket to our annual VIP event",
    category: "Experiences",
  },
];

export default function PointsManagementSystem() {
  // State management
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [transactions, setTransactions] =
    useState<PointTransaction[]>(mockTransactions);
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isRewardDialogOpen, setIsRewardDialogOpen] = useState(false);
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("users");
  const [editMode, setEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form states
  const [userForm, setUserForm] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    points: 0,
    level: "Bronze",
    joinDate: new Date().toISOString().split("T")[0],
  });

  const [rewardForm, setRewardForm] = useState<Omit<Reward, "id">>({
    name: "",
    cost: 0,
    description: "",
    category: "Gift Cards",
  });

  const [transactionForm, setTransactionForm] = useState<PointTransaction>({
    id: '1',
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: 0,
    type: "earned",
  });

  // Filtered data
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRewards = rewards.filter(
    (reward) =>
      reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (selectedUser && transaction.id.includes(searchTerm.toLowerCase()))
  );

  // Handlers
  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode && selectedUser) {
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id ? { ...userForm, id: selectedUser.id } : u
        )
      );
    } else {
      setUsers([...users, { ...userForm, id: `user-${users.length + 1}` }]);
    }
    resetForms();
    setIsUserDialogOpen(false);
  };

  const handleRewardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editMode) {
      // In a real app, we'd have a selectedReward state
      setRewards([
        ...rewards,
        { ...rewardForm, id: `reward-${rewards.length + 1}` },
      ]);
    } else {
      setRewards([
        ...rewards,
        { ...rewardForm, id: `reward-${rewards.length + 1}` },
      ]);
    }
    resetForms();
    setIsRewardDialogOpen(false);
  };

  const handleTransactionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTransactions([
      ...transactions,
      { ...transactionForm, id: `trans-${transactions.length + 1}` },
    ]);
    resetForms();
    setIsTransactionDialogOpen(false);
  };

  const resetForms = () => {
    setUserForm({
      name: "",
      email: "",
      points: 0,
      level: "Bronze",
      joinDate: new Date().toISOString().split("T")[0],
    });
    setRewardForm({
      name: "",
      cost: 0,
      description: "",
      category: "Gift Cards",
    });
    setTransactionForm({
      id:'1',
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
      type: "earned",
    });
    setEditMode(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleDeleteReward = (id: string) => {
    setRewards(rewards.filter((reward) => reward.id !== id));
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleEditUser = (user: User) => {
    setUserForm({
      name: user.name,
      email: user.email,
      points: user.points,
      level: user.level,
      joinDate: user.joinDate,
    });
    setSelectedUser(user);
    setEditMode(true);
    setIsUserDialogOpen(true);
  };

  // Insights calculations
  const totalPoints = users.reduce((sum, user) => sum + user.points, 0);
  const averagePoints =
    users.length > 0 ? Math.round(totalPoints / users.length) : 0;
  const pointsEarned = transactions
    .filter((t) => t.type === "earned")
    .reduce((sum, t) => sum + t.amount, 0);
  const pointsRedeemed = transactions
    .filter((t) => t.type === "redeemed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const levelDistribution = users.reduce((acc, user) => {
    acc[user.level] = (acc[user.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen min-w-full bg-gray-50 p-6">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Points Management System
          </h1>

          {/* Search and Actions */}
          <div className="flex justify-between items-center mb-6">
            <Input
              placeholder="Search users, rewards, or transactions..."
              className="max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentTab("users");
                  setIsUserDialogOpen(true);
                  setEditMode(false);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add User
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentTab("rewards");
                  setIsRewardDialogOpen(true);
                  setEditMode(false);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Reward
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentTab("transactions");
                  setIsTransactionDialogOpen(true);
                  setEditMode(false);
                }}
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Transaction
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            className="mb-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">
                <UserIcon className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="rewards">
                <GiftIcon className="h-4 w-4 mr-2" />
                Rewards
              </TabsTrigger>
              <TabsTrigger value="transactions">
                <HistoryIcon className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="insights">
                <TrendingUpIcon className="h-4 w-4 mr-2" />
                Insights
              </TabsTrigger>
            </TabsList>
            {/* Users Tab */}
            <TabsContent className=" " value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage all users and their points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage
                                  src={`https://i.pravatar.cc/150?u=${user.email}`}
                                />
                                <AvatarFallback>
                                  {user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-green-600">
                              {user.points.toLocaleString()} pts
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.level === "Bronze"
                                  ? "bg-amber-100 text-amber-800"
                                  : user.level === "Silver"
                                  ? "bg-gray-100 text-gray-800"
                                  : user.level === "Gold"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {user.level}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(user.joinDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditUser(user)}
                              >
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setCurrentTab("transactions");
                                }}
                              >
                                <HistoryIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent className="min-w-full w-auto" value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle>Rewards Catalog</CardTitle>
                  <CardDescription>
                    Manage available rewards for redemption
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reward</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRewards.map((reward) => (
                        <TableRow key={reward.id}>
                          <TableCell className="font-medium">
                            {reward.name}
                          </TableCell>
                          <TableCell>{reward.description}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{reward.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="text-purple-600"
                            >
                              {reward.cost.toLocaleString()} pts
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteReward(reward.id)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transactions Tab */}
            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Points Transactions</CardTitle>
                      <CardDescription>
                        {selectedUser
                          ? `Transaction history for ${selectedUser.name}`
                          : "All points transactions"}
                      </CardDescription>
                    </div>
                    {selectedUser && (
                      <Button
                        variant="outline"
                        onClick={() => setSelectedUser(null)}
                      >
                        View All Transactions
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(selectedUser
                        ? filteredTransactions
                        : filteredTransactions
                      ).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {new Date(transaction.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>
                            {users.find(
                              (u) => u.id === transaction.id.split("-")[1]
                            )?.name || "System"}
                          </TableCell>
                          <TableCell>
                            <div
                              className={`flex items-center ${
                                transaction.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.amount > 0 ? (
                                <ArrowUpIcon className="h-4 w-4 mr-1" />
                              ) : (
                                <ArrowDownIcon className="h-4 w-4 mr-1" />
                              )}
                              {Math.abs(transaction.amount).toLocaleString()}{" "}
                              pts
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                transaction.type === "earned"
                                  ? "bg-green-100 text-green-800"
                                  : transaction.type === "redeemed"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {transaction.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDeleteTransaction(transaction.id)
                              }
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <UserIcon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{users.length}</div>
                    <p className="text-xs text-gray-500">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Points
                    </CardTitle>
                    <GiftIcon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {totalPoints.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500">+8% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg Points/User
                    </CardTitle>
                    <TrendingUpIcon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {averagePoints.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500">+5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Rewards
                    </CardTitle>
                    <GiftIcon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rewards.length}</div>
                    <p className="text-xs text-gray-500">3 new this month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 mt-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Points Flow</CardTitle>
                    <CardDescription>Earned vs Redeemed points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                        <span>Earned</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {pointsEarned.toLocaleString()} pts
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                        <span>Redeemed</span>
                      </div>
                      <div className="text-lg font-semibold">
                        {pointsRedeemed.toLocaleString()} pts
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Levels Distribution</CardTitle>
                    <CardDescription>
                      Breakdown of user membership levels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(levelDistribution).map(
                        ([level, count]) => (
                          <div
                            key={level}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <Badge
                                variant="outline"
                                className={
                                  level === "Bronze"
                                    ? "bg-amber-100 text-amber-800"
                                    : level === "Silver"
                                    ? "bg-gray-100 text-gray-800"
                                    : level === "Gold"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                {level}
                              </Badge>
                            </div>
                            <div className="text-lg font-semibold">
                              {count} (
                              {Math.round((count / users.length) * 100)}%)
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest points transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center">
                        <div className="flex-shrink-0">
                          {transaction.type === "earned" ? (
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                              <ArrowUpIcon className="h-5 w-5" />
                            </div>
                          ) : transaction.type === "redeemed" ? (
                            <div className="p-2 rounded-full bg-red-100 text-red-600">
                              <ArrowDownIcon className="h-5 w-5" />
                            </div>
                          ) : (
                            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                              <PencilIcon className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">
                              {transaction.description}
                            </p>
                            <p
                              className={`text-sm ${
                                transaction.amount > 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.amount > 0 ? "+" : ""}
                              {transaction.amount} pts
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {users.find(
                              (u) => u.id === transaction.id.split("-")[1]
                            )?.name || "System"}{" "}
                            • {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* User Dialog */}
          <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editMode ? "Edit User" : "Add New User"}
                </DialogTitle>
                <DialogDescription>
                  {editMode
                    ? "Update user details below"
                    : "Fill in the details for the new user"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUserSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={userForm.name}
                      onChange={(e) =>
                        setUserForm({ ...userForm, name: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="email" className="text-right">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={userForm.email}
                      onChange={(e) =>
                        setUserForm({ ...userForm, email: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="points" className="text-right">
                      Points
                    </label>
                    <Input
                      id="points"
                      type="number"
                      value={userForm.points}
                      onChange={(e) =>
                        setUserForm({
                          ...userForm,
                          points: parseInt(e.target.value) || 0,
                        })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="level" className="text-right">
                      Level
                    </label>
                    <Select
                      value={userForm.level}
                      onValueChange={(value) =>
                        setUserForm({
                          ...userForm,
                          level: value as User["level"],
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bronze">Bronze</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="joinDate" className="text-right">
                      Join Date
                    </label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={userForm.joinDate}
                      onChange={(e) =>
                        setUserForm({ ...userForm, joinDate: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">
                    {editMode ? "Update User" : "Add User"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Reward Dialog */}
          <Dialog
            open={isRewardDialogOpen}
            onOpenChange={setIsRewardDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Reward</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new reward
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleRewardSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="rewardName" className="text-right">
                      Name
                    </label>
                    <Input
                      id="rewardName"
                      value={rewardForm.name}
                      onChange={(e) =>
                        setRewardForm({ ...rewardForm, name: e.target.value })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="rewardCost" className="text-right">
                      Cost
                    </label>
                    <Input
                      id="rewardCost"
                      type="number"
                      value={rewardForm.cost}
                      onChange={(e) =>
                        setRewardForm({
                          ...rewardForm,
                          cost: parseInt(e.target.value) || 0,
                        })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="rewardDescription" className="text-right">
                      Description
                    </label>
                    <Input
                      id="rewardDescription"
                      value={rewardForm.description}
                      onChange={(e) =>
                        setRewardForm({
                          ...rewardForm,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="rewardCategory" className="text-right">
                      Category
                    </label>
                    <Select
                      value={rewardForm.category}
                      onValueChange={(value) =>
                        setRewardForm({
                          ...rewardForm,
                          category: value,
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gift Cards">Gift Cards</SelectItem>
                        <SelectItem value="Digital">Digital</SelectItem>
                        <SelectItem value="Shipping">Shipping</SelectItem>
                        <SelectItem value="Experiences">Experiences</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Reward</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Transaction Dialog */}
          <Dialog
            open={isTransactionDialogOpen}
            onOpenChange={setIsTransactionDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Transaction</DialogTitle>
                <DialogDescription>
                  Record a new points transaction
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleTransactionSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="transactionUser" className="text-right">
                      User
                    </label>
                    <Select
                      value={transactionForm.id}
                      onValueChange={(value) =>
                        setTransactionForm({
                          ...transactionForm,
                          id: value,
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="transactionDate" className="text-right">
                      Date
                    </label>
                    <Input
                      id="transactionDate"
                      type="date"
                      value={transactionForm.date}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          date: e.target.value,
                        })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label
                      htmlFor="transactionDescription"
                      className="text-right"
                    >
                      Description
                    </label>
                    <Input
                      id="transactionDescription"
                      value={transactionForm.description}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="transactionAmount" className="text-right">
                      Amount
                    </label>
                    <Input
                      id="transactionAmount"
                      type="number"
                      value={transactionForm.amount}
                      onChange={(e) =>
                        setTransactionForm({
                          ...transactionForm,
                          amount: parseInt(e.target.value) || 0,
                        })
                      }
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="transactionType" className="text-right">
                      Type
                    </label>
                    <Select
                      value={transactionForm.type}
                      onValueChange={(value) =>
                        setTransactionForm({
                          ...transactionForm,
                          type: value as PointTransaction["type"],
                        })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="earned">Earned</SelectItem>
                        <SelectItem value="redeemed">Redeemed</SelectItem>
                        <SelectItem value="adjusted">Adjusted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Transaction</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
