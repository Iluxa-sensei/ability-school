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
    Award,
    Settings,
    Camera,
    Save,
    Edit3,
    X,
    GraduationCap,
    Users,
    Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TeacherProfile = () => {
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "Айгүл",
        lastName: "Нұрланова",
        email: "aigul.nurlanova@school.kz",
        phone: "+7 (999) 555-44-33",
        birthDate: "1985-07-20",
        address: "г. Москва, ул. Пушкина, д. 15, кв. 42",
        bio: "Учитель математики с 15-летним стажем. Специализируюсь на подготовке к ЕГЭ и олимпиадам. Люблю инновационные методы обучения.",
        subject: "Математика",
        experience: "15 лет",
        education: "МГУ, факультет математики, 2007",
        qualification: "Высшая категория",
        school: "ГБОУ СОШ №1234",
        department: "Естественно-научный"
    });

    const classes = [
        { name: "10А", students: 25, subject: "Алгебра и начала анализа" },
        { name: "10Б", students: 23, subject: "Алгебра и начала анализа" },
        { name: "11А", students: 24, subject: "Алгебра и начала анализа" },
        { name: "9В", students: 22, subject: "Алгебра" }
    ];

    const achievements = [
        { id: 1, title: "Учитель года 2023", date: "2023-05-15", level: "Городской" },
        { id: 2, title: "Лучший результат ЕГЭ по математике", date: "2023-07-01", level: "Школьный" },
        { id: 3, title: "Победитель конкурса инновационных методик", date: "2022-12-10", level: "Региональный" }
    ];

    const schedule = [
        { day: "Понедельник", time: "09:00-10:30", class: "10А", room: "201" },
        { day: "Понедельник", time: "11:00-12:30", class: "10Б", room: "201" },
        { day: "Вторник", time: "09:00-10:30", class: "11А", room: "201" },
        { day: "Вторник", time: "14:00-15:30", class: "9В", room: "201" },
        { day: "Среда", time: "10:00-11:30", class: "10А", room: "201" },
        { day: "Четверг", time: "09:00-10:30", class: "10Б", room: "201" },
        { day: "Пятница", time: "11:00-12:30", class: "11А", room: "201" }
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
                    <p className="text-muted-foreground">Управление личной информацией и профессиональными данными</p>
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
                    <TabsTrigger value="professional">Профессиональная деятельность</TabsTrigger>
                    <TabsTrigger value="classes">Классы и расписание</TabsTrigger>
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
                                            ЕС
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
                                    <p className="text-muted-foreground">Учитель математики</p>
                                    <div className="flex gap-2">
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            {formData.qualification}
                                        </Badge>
                                        <Badge variant="outline">
                                            {formData.experience} опыта
                                        </Badge>
                                    </div>
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
                </TabsContent>

                <TabsContent value="professional" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <GraduationCap className="h-5 w-5" />
                                Профессиональная информация
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Предмет</Label>
                                        <Input
                                            id="subject"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="experience">Стаж работы</Label>
                                        <Input
                                            id="experience"
                                            value={formData.experience}
                                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="qualification">Квалификационная категория</Label>
                                        <Input
                                            id="qualification"
                                            value={formData.qualification}
                                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="education">Образование</Label>
                                        <Textarea
                                            id="education"
                                            value={formData.education}
                                            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                                            disabled={!isEditing}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="school">Школа</Label>
                                        <Input
                                            id="school"
                                            value={formData.school}
                                            onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Кафедра/Отдел</Label>
                                        <Input
                                            id="department"
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="classes" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Мои классы
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {classes.map((cls, index) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold">{cls.name}</h4>
                                            <Badge variant="outline">{cls.students} учеников</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{cls.subject}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Расписание уроков
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {schedule.map((lesson, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="text-sm font-medium w-20">{lesson.day}</div>
                                            <div className="text-sm text-muted-foreground w-24">{lesson.time}</div>
                                            <div className="font-medium">{lesson.class}</div>
                                        </div>
                                        <Badge variant="outline">Каб. {lesson.room}</Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Профессиональные достижения
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {achievements.map((achievement) => (
                                    <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                            <Award className="h-6 w-6 text-white" />
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

export default TeacherProfile;
