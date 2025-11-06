"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Users,
  Zap,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform analytics and user management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminStatCard
          icon={<Users className="w-6 h-6" />}
          label="Total Users"
          value="1,234"
          change="+45 this week"
        />
        <AdminStatCard
          icon={<Zap className="w-6 h-6" />}
          label="Questions Generated"
          value="24,567"
          change="+1,200 this week"
        />
        <AdminStatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Avg. Accuracy"
          value="78.5%"
          change="+2.3% improvement"
        />
        <AdminStatCard
          icon={<BarChart3 className="w-6 h-6" />}
          label="Active Sessions"
          value="234"
          change="Real-time"
        />
      </div>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Most Popular Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Data Structures", count: 2456, percentage: 85 },
              { name: "React", count: 1890, percentage: 72 },
              { name: "JavaScript", count: 1567, percentage: 64 },
              { name: "DBMS", count: 1234, percentage: 58 },
            ].map((topic) => (
              <div key={topic.name}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{topic.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {topic.count} questions
                  </span>
                </div>
                <Progress value={topic.percentage} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Recent Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  id: 1,
                  name: "John Doe",
                  email: "john@example.com",
                  status: "active",
                  joined: "2 days ago",
                  activity: "23 interviews",
                },
                {
                  id: 2,
                  name: "Jane Smith",
                  email: "jane@example.com",
                  status: "active",
                  joined: "5 days ago",
                  activity: "12 interviews",
                },
                {
                  id: 3,
                  name: "Alex Johnson",
                  email: "alex@example.com",
                  status: "inactive",
                  joined: "1 week ago",
                  activity: "5 interviews",
                },
                {
                  id: 4,
                  name: "Sarah Williams",
                  email: "sarah@example.com",
                  status: "active",
                  joined: "3 days ago",
                  activity: "18 interviews",
                },
              ].map((user) => (
                <TableRow key={user.id} className="border-b hover:bg-muted/50">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        user.status === "active"
                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                          : "bg-gray-500/10 text-gray-700"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.joined}
                  </TableCell>
                  <TableCell className="text-sm">{user.activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "API Response Time", status: "healthy", value: "125ms" },
              {
                name: "Database Performance",
                status: "healthy",
                value: "99.8% uptime",
              },
              {
                name: "Queue Processing",
                status: "healthy",
                value: "2,450 pending",
              },
              { name: "Cache Hit Rate", status: "healthy", value: "94.2%" },
            ].map((metric) => (
              <div
                key={metric.name}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">{metric.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {metric.value}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-700 dark:text-green-400"
                >
                  {metric.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminStatCard({ icon, label, value, change }: any) {
  return (
    <Card className="border-border bg-card/50">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-primary mt-2">{change}</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
