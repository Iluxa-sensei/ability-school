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
    BookOpen,
    Trophy,
    Settings,
    Camera,
    Save,
    Edit3,
    X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentProfile = () => {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "Нұрлан",
        lastName: "Ахметов",
        email: "nurlan.akhmetov@school.kz",
        phone: "+7 (999) 123-45-67",
        birthDate: "2008-03-15",
        address: "г. Москва, ул. Ленина, д. 10, кв. 25",
        bio: "Увлекаюсь программированием и математикой. Люблю читать научную фантастику и играть в шахматы.",
        class: "10А",
        school: "ГБОУ СОШ №1234",
        parentName: "Айгүл Ахметова",
        parentPhone: "+7 (999) 987-65-43"
    });

    const achievements = [
        { id: 1, title: "Победитель олимпиады по математике", date: "2024-01-15", level: "Городской" },
        { id: 2, title: "Лучший проект по программированию", date: "2023-12-10", level: "Школьный" },
        { id: 3, title: "Отличник учебы", date: "2023-09-01", level: "Школьный" }
    ];

    const subjects = [
        { name: "Математика", grade: 5, teacher: "Смирнова Е.А." },
        { name: "Физика", grade: 5, teacher: "Козлов И.В." },
        { name: "Информатика", grade: 5, teacher: "Новиков А.С." },
        { name: "Русский язык", grade: 4, teacher: "Волкова М.П." },
        { name: "Литература", grade: 4, teacher: "Волкова М.П." },
        { name: "Тарих", grade: 4, teacher: "Төлеуов Е.И." }
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
                    <p className="text-muted-foreground">Управление личной информацией и настройками</p>
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
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Личная информация</TabsTrigger>
                    <TabsTrigger value="academic">Учебная деятельность</TabsTrigger>
                    <TabsTrigger value="achievements">Достижения</TabsTrigger>
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
                                            АП
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
                                    <p className="text-muted-foreground">Ученик 10А класса</p>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        Активный ученик
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
                                        <Label htmlFor="phone">Телефон</Label>
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

                    <Card className="profile-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Контактная информация родителей
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="parentName">Имя родителя</Label>
                                    <Input
                                        id="parentName"
                                        value={formData.parentName}
                                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parentPhone">Телефон родителя</Label>
                                    <Input
                                        id="parentPhone"
                                        value={formData.parentPhone}
                                        onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="academic" className="space-y-6 profile-tab-content">
                    <Card className="profile-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5" />
                                Учебная информация
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Класс</Label>
                                    <Input value={formData.class} disabled />
                                </div>
                                <div className="space-y-2">
                                    <Label>Школа</Label>
                                    <Input value={formData.school} disabled />
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <h4 className="text-lg font-semibold mb-4">Оценки по предметам</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {subjects.map((subject) => (
                                        <div key={subject.name} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{subject.name}</p>
                                                <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                                            </div>
                                            <Badge
                                                variant={subject.grade === 5 ? "default" : "secondary"}
                                                className={subject.grade === 5 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                                            >
                                                {subject.grade}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6 profile-tab-content">
                    <Card className="profile-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5" />
                                Достижения и награды
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {achievements.map((achievement) => (
                                    <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                            <Trophy className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{achievement.title}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(achievement.date).toLocaleDateString('ru-RU')} • {achievement.level}
                                            </p>
                                        </div>
                                        <Badge variant="outline">{achievement.level}</Badge>
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

export default StudentProfile;
