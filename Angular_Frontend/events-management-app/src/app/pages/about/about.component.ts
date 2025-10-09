import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { FooterComponent } from '../../components/shared/footer/footer.component';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  avatar: string;
  vk?: string;
  telegram?: string;
}

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  description: string;
  website?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isDarkMode = false;

  // Team members data - showing 4 detailed profiles out of 42 total
  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Кирилл Долгов',
      role: 'Программный директор НОЦ "Точка кипения"',
      bio: 'Главный специалист отдела организационно-технического обеспечения НОЦ "Точка кипения " ',
      skills: ['Angular', 'Spring Boot', 'TypeScript', 'Java'],
      avatar: 'https://leader-id.storage.yandexcloud.net/user_photo/444539/65399960a15ad567641599_360.jpg',
      vk: 'https://vk.com/dolgov_ks',
      telegram: 'https://t.me/dolgov_ks'
    },
    {
      id: 2,
      name: 'Мария Новичкова',
      role: 'Начальник отдела медиапроектирования',
      bio: 'Начальник отдела медиапроектирования Департамента инноваций и технологического предпринимательства',
      skills: ['UI/UX Design', 'Figma'],
      avatar: 'https://leader-id.storage.yandexcloud.net/user_photo/384975/63c683f193bca411543485_360.jpeg',
      vk: '№',
      telegram: '№'
    },
    {
      id: 3,
      name: 'Денис Ефремов',
      role: 'Директор НОЦ "Метатория"',
      bio: 'Директор департамента инноваций и технологического предпринимательства',
      skills: ['Product Management', 'Agile/Scrum', 'Testing', 'Analytics'],
      avatar: 'https://leader-id.storage.yandexcloud.net/upload/255879/bc0b8832-2c91-4bd9-b6a1-04ae1672ff43_360.jpg',
      vk: '№',
      telegram: '№'
    },
    {
      id: 4,
      name: 'Елена Лукьянова',
      role: 'Директор НОЦ "Точка кипения"',
      bio: 'Директор, ассистент, кафедра "Информационные системы"',
      skills: ['Product Management', 'Agile/Scrum', 'Testing', 'Analytics'],
      avatar: 'https://leader-id.storage.yandexcloud.net/upload/870326/139ae6fe-f46c-41b0-8b19-2f20ce7e3093_360.jpg',
      vk: '№',
      telegram: '№'
    }
  ];

  // Sponsors data
  sponsors: Sponsor[] = [
    {
      id: 1,
      name: 'TechCorp',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      description: 'Ведущий поставщик технологических решений',
      website: 'https://techcorp.com'
    },
    {
      id: 2,
      name: 'InnovateHub',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg',
      description: 'Акселератор инноваций и стартапов',
      website: 'https://innovatehub.com'
    },
    {
      id: 3,
      name: 'EduTech Solutions',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazon/amazon-original.svg',
      description: 'Платформа образовательных технологий',
      website: 'https://edutech.com'
    },
    {
      id: 4,
      name: 'NextGen Labs',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      description: 'Лаборатория исследований и разработок',
      website: 'https://nextgenlabs.com'
    },
    {
      id: 5,
      name: 'CodeCraft Studios',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      description: 'Агентство современного веб-разработки',
      website: 'https://codecraft.studio'
    },
  ];

  // Event management workflow steps
  workflowSteps = [
    {
      id: 1,
      title: 'Создание мероприятий',
      description: 'Организаторы создают мероприятия с подробной информацией, расписанием и требованиями.',
      icon: 'create'
    },
    {
      id: 2,
      title: 'Система регистрации',
      description: 'Удобный процесс регистрации для участников с автоматическими подтверждениями.',
      icon: 'register'
    },
    {
      id: 3,
      title: 'Управление мероприятиями',
      description: 'Отслеживание мероприятий в реальном времени, управление участниками и инструменты для общения.',
      icon: 'manage'
    },
    {
      id: 4,
      title: 'Аналитика и отзывы',
      description: 'Комплексная аналитика и сбор отзывов для постоянного улучшения.',
      icon: 'analytics'
    }
  ];

  constructor(
    private themeService: ThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.isDarkMode$.subscribe(
      isDark => this.isDarkMode = isDark
    );
  }

  // Open sponsor website
  openSponsorWebsite(sponsor: Sponsor): void {
    if (sponsor.website) {
      window.open(sponsor.website, '_blank');
    }
  }

  // Helper methods for fallback images
  getTeamMemberFallbackImage(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3a72ec&color=ffffff&size=200`;
  }

  getSponsorFallbackImage(name: string): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=ffffff&size=80`;
  }

  // Handle image errors
  onTeamImageError(member: TeamMember): void {
    member.avatar = this.getTeamMemberFallbackImage(member.name);
  }

  onSponsorImageError(sponsor: Sponsor): void {
    sponsor.logo = this.getSponsorFallbackImage(sponsor.name);
  }

  // Open team member social links
  openVK(member: TeamMember): void {
    if (member.vk) {
      window.open(member.vk, '_blank');
    }
  }

  openTelegram(member: TeamMember): void {
    if (member.telegram) {
      window.open(member.telegram, '_blank');
    }
  }
}
