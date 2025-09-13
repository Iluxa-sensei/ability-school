import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Users,
    Heart,
    Settings,
    Camera,
    Save,
    Edit3,
    X,
    Baby,
    BookOpen,
    TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ParentProfile = () => {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "Айгүл",
        lastName: "Ахметова",
        email: "aigul.akhmetova@email.kz",
        phone: "+7 (999) 987-65-43",
        birthDate: "1980-05-12",
        address: "г. Москва, ул. Ленина, д. 10, кв. 25",
        bio: "Мама двух детей, работаю в IT-сфере. Активно участвую в школьной жизни детей.",
        workPlace: "ООО Технологии будущего",
        position: "Менеджер проектов",
        workPhone: "+7 (495) 123-45-67"
    });

    const children = [
        {
            id: 1,
            name: "Нұрлан Ахметов",
            class: "10А",
            school: "ГБОУ СОШ №1234",
            birthDate: "2008-03-15",
            teacher: "Смирнова Е.А.",
            status: "Активный"
        },
        {
            id: 2,
            name: "Айжан Ахметова",
            class: "7Б",
            school: "ГБОУ СОШ №1234",
            birthDate: "2011-08-22",
            teacher: "Козлова И.В.",
            status: "Активный"
        }
    ];

    const notifications = [
        { id: 1, title: "Родительское собрание", date: "2024-02-15", type: "meeting" },
        { id: 2, title: "Оценки за неделю", date: "2024-02-10", type: "grades" },
        { id: 3, title: "Домашнее задание", date: "2024-02-08", type: "homework" }
    ];

    const recentActivity = [
        { id: 1, child: "Нұрлан", action: "Математикадан 5 баға алды", date: "2024-02-12" },
        { id: 2, child: "Айжан", action: "Үй жұмысын тапсырды", date: "2024-02-11" },
        { id: 3, child: "Нұрлан", action: "Физика олимпиадасына қатысты", date: "2024-02-10" }
    ];

    const handleSave = () => {
        setIsEditing(false);
        toast({
            title: "Профиль обновлен",
            description: "Ваши данные успешно сохранены.",
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        toast({
            title: "Изменения отменены",
            description: "Все несохраненные изменения отменены.",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gradient">Мой профиль</h1>
                    <p className="text-muted-foreground">Управление личной информацией и данными детей</p>
                </div>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                <Save className="h-4 w-4 mr-2" />
                                Сохранить
                            </Button>
                            <Button variant="outline" onClick={handleCancel}>
                                <X className="h-4 w-4 mr-2" />
                                Отмена
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)} variant="outline">
                            <Edit3 className="h-4 w-4 mr-2" />
                            Редактировать
                        </Button>
                    )}
                </div>
            </div>

            <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="personal">Личная информация</TabsTrigger>
                    <TabsTrigger value="children">Мои дети</TabsTrigger>
                    <TabsTrigger value="notifications">Уведомления</TabsTrigger>
                    <TabsTrigger value="activity">Активность</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6 profile-tab-content">
                    <Card className="profile-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Личная информация
                            </CardTitle>
                            <CardDescription>
                                Основные данные профиля
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="/placeholder.svg" alt="Аватар" />
                                        <AvatarFallback className="text-lg avatar-gradient text-white">
                                            МП
                                        </AvatarFallback>
                                    </Avatar>
                                    {isEditing && (
                                        <Button
                                            size="sm"
                                            className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                                            variant="secondary"
                                        >
                                            <Camera className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h3>
                                    <p className="text-muted-foreground">Родитель</p>
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        Активный родитель
                                    </Badge>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Имя</Label>
                                        <Input
                                            id="firstName"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Фамилия</Label>
                                        <Input
                                            id="lastName"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Личный телефон</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="birthDate">Дата рождения</Label>
                                        <Input
                                            id="birthDate"
                                            type="date"
                                            value={formData.birthDate}
                                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Адрес</Label>
                                        <Textarea
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            disabled={!isEditing}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="bio">О себе</Label>
                                        <Textarea
                                            id="bio"
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            disabled={!isEditing}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Рабочая информация
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="workPlace">Место работы</Label>
                                    <Input
                                        id="workPlace"
                                        value={formData.workPlace}
                                        onChange={(e) => setFormData({ ...formData, workPlace: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="position">Должность</Label>
                                    <Input
                                        id="position"
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="workPhone">Рабочий телефон</Label>
                                    <Input
                                        id="workPhone"
                                        value={formData.workPhone}
                                        onChange={(e) => setFormData({ ...formData, workPhone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="children" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Baby className="h-5 w-5" />
                                Мои дети
                            </CardTitle>
                            <CardDescription>
                                Информация о детях, обучающихся в школе
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {children.map((child) => (
                                    <div key={child.id} className="p-4 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12">
                                                <AvatarImage src="/placeholder.svg" alt={child.name} />
                                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                                    {child.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{child.name}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    {child.class} класс • {child.school}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Классный руководитель: {child.teacher}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <Badge variant="outline" className="mb-2">
                                                    {child.status}
                                                </Badge>
                                                <p className="text-sm text-muted-foreground">
                                                    Родился: {new Date(child.birthDate).toLocaleDateString('ru-RU')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5" />
                                Уведомления
                            </CardTitle>
                            <CardDescription>
                                Последние уведомления от школы
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {notifications.map((notification) => (
                                    <div key={notification.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                            {notification.type === 'meeting' && <Users className="h-5 w-5 text-white" />}
                                            {notification.type === 'grades' && <TrendingUp className="h-5 w-5 text-white" />}
                                            {notification.type === 'homework' && <BookOpen className="h-5 w-5 text-white" />}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{notification.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(notification.date).toLocaleDateString('ru-RU')}
                                            </p>
                                        </div>
                                        <Badge variant="outline">
                                            {notification.type === 'meeting' && 'Собрание'}
                                            {notification.type === 'grades' && 'Оценки'}
                                            {notification.type === 'homework' && 'Домашнее задание'}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Последняя активность
                            </CardTitle>
                            <CardDescription>
                                Недавние события с участием ваших детей
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
                                            <TrendingUp className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{activity.action}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {activity.child} • {new Date(activity.date).toLocaleDateString('ru-RU')}
                                            </p>
                                        </div>
                                        <Badge variant="outline">Активность</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ParentProfile;
