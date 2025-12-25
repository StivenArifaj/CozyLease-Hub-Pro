
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Mail, Shield, Bell, Lock, Camera, ChevronRight, Sparkles } from "lucide-react";

const Profile = () => {
    const { user } = useAuthStore();

    if (!user) return null;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Profile Settings</h2>
                    <p className="text-slate-500">Manage your personal information and account preferences.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 h-12 px-8 rounded-xl font-bold">
                    Save All Changes
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Quick Info */}
                <motion.div variants={item} className="space-y-6">
                    <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                        <CardContent className="p-8 text-center">
                            <div className="relative w-32 h-32 mx-auto mb-6">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                                    <AvatarImage src={user.avatar} />
                                    <AvatarFallback className="text-4xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold">
                                        {user.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors border-4 border-white">
                                    <Camera className="h-4 w-4" />
                                </button>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900">{user.name}</h3>
                            <p className="text-slate-500 font-medium capitalize mb-6">{user.role}</p>

                            <div className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 text-blue-700 rounded-full w-fit mx-auto text-xs font-bold uppercase tracking-wider">
                                <Sparkles className="h-3 w-3" />
                                Pro Member
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                                        <Shield className="h-4 w-4 text-slate-600" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">Security</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-400" />
                            </div>
                            <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white transition-colors">
                                        <Bell className="h-4 w-4 text-slate-600" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">Notifications</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-400" />
                            </div>
                            <div className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group text-red-600">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 rounded-lg group-hover:bg-white transition-colors">
                                        <Lock className="h-4 w-4 text-red-600" />
                                    </div>
                                    <span className="text-sm font-bold">Privacy</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-red-300" />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div variants={item}>
                        <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                            <CardHeader className="border-b border-slate-100 p-8">
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-xl">
                                        <User className="h-5 w-5 text-blue-600" />
                                    </div>
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</Label>
                                        <Input id="name" defaultValue={user.name} className="rounded-xl h-12 border-slate-200 focus:ring-blue-500/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input id="email" defaultValue={user.email} disabled className="pl-10 rounded-xl h-12 bg-slate-50 border-slate-200 text-slate-500" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bio</Label>
                                    <Input id="bio" placeholder="Tell us about yourself" className="rounded-xl h-12 border-slate-200 focus:ring-blue-500/20" />
                                </div>
                                <div className="pt-4">
                                    <Button onClick={() => toast.success("Profile updated!")} className="rounded-xl h-12 px-8 font-bold bg-blue-600 hover:bg-blue-700">
                                        Update Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div variants={item}>
                        <Card className="border-slate-200/60 shadow-sm rounded-3xl overflow-hidden">
                            <CardHeader className="border-b border-slate-100 p-8">
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <div className="p-2 bg-slate-50 rounded-xl">
                                        <Lock className="h-5 w-5 text-slate-600" />
                                    </div>
                                    Account Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-8 space-y-6">
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div>
                                        <div className="font-bold text-slate-900">Email Notifications</div>
                                        <div className="text-sm text-slate-500 font-medium">Receive updates about your properties and payments</div>
                                    </div>
                                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold">Configure</Button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div>
                                        <div className="font-bold text-slate-900">Two-Factor Authentication</div>
                                        <div className="text-sm text-slate-500 font-medium">Add an extra layer of security to your account</div>
                                    </div>
                                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-blue-600 border-blue-100 bg-blue-50 hover:bg-blue-100">Enable</Button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div>
                                        <div className="font-bold text-slate-900">Password</div>
                                        <div className="text-sm text-slate-500 font-medium">Last changed 3 months ago</div>
                                    </div>
                                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold">Change</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
