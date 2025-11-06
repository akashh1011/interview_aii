"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Bell, Shield, Zap, Target } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <Card className="border-border bg-card/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Profile Information</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save Changes" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=john"
                  alt="John Doe"
                />
                <AvatarFallback className="text-xl font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              )}
            </div>

            {/* Form */}
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Full Name</Label>
                <Input
                  defaultValue="John Doe"
                  disabled={!isEditing}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Email</Label>
                <Input
                  defaultValue="john@example.com"
                  disabled={!isEditing}
                  className="bg-input border-border"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground font-medium">
                  Experience Level
                </Label>
                <select
                  disabled={!isEditing}
                  defaultValue="intermediate"
                  className="w-full p-2 rounded-lg border border-border bg-input text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Interviews Completed
                </p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center text-green-600">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                <p className="text-2xl font-bold text-green-600">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Badge variant="default" className="text-lg">
                  42
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Rank</p>
                <p className="text-2xl font-bold">#42</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security */}
      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
          >
            <Lock className="w-4 h-4 mr-2" />
            Change Password
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start bg-transparent"
          >
            <Shield className="w-4 h-4 mr-2" />
            Two-Factor Authentication
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Last password change: 2 months ago
          </p>
        </CardContent>
      </Card>

      <Card className="border-border bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox id="email-questions" defaultChecked />
              <Label
                htmlFor="email-questions"
                className="font-normal cursor-pointer"
              >
                Email notifications for new questions
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="weekly-reports" defaultChecked />
              <Label
                htmlFor="weekly-reports"
                className="font-normal cursor-pointer"
              >
                Weekly progress reports
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="marketing-emails" />
              <Label
                htmlFor="marketing-emails"
                className="font-normal cursor-pointer"
              >
                Marketing and product updates
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="rank-changes" defaultChecked />
              <Label
                htmlFor="rank-changes"
                className="font-normal cursor-pointer"
              >
                Notify me when I rank up
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
