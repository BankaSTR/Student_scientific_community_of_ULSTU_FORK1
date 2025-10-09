import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/shared/footer/footer.component';

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  fileName: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
  // Removed animations completely for instant modal display
})
export class GalleryComponent implements OnInit, OnDestroy {

  // Gallery data properties
  allImages: GalleryImage[] = [];
  currentPageImages: GalleryImage[] = [];
  currentPage = 1;
  totalPages = 3;
  imagesPerPage = 17;

  // Modal properties
  selectedImage: GalleryImage | null = null;
  showModal = false;

  // Loading state
  isLoading = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  private loadImages(): void {
    // Получаем все 51 изображение (gallery-image-1.png ... gallery-image-51.png)
    const imageFileNames: string[] = [];
    for (let i = 1; i <= 51; i++) {
      imageFileNames.push(`gallery-image-${i}.jpg`);
    }
    // Формируем объекты GalleryImage с русскими названиями и описаниями для СНС УлГТУ
    this.allImages = imageFileNames.map((fileName, index) => ({
      id: index + 1,
      src: `assets/images/Image-Gallery/${fileName}`,
      alt: this.generateAltTextRu(fileName),
      eventName: this.generateEventNameRu(index + 1),
      eventDescription: this.generateEventDescriptionRu(index + 1),
      eventDate: this.generateEventDateRu(index + 1),
      fileName: fileName
    }));
    this.shuffleArray(this.allImages);
    this.loadCurrentPage();
    this.isLoading = false;
  }

  private generateAltTextRu(fileName: string): string {
    // Преобразует имя файла в alt на русском
    return 'Фото с мероприятия СНС УлГТУ';
  }

  private generateEventNameRu(imageNumber: number): string {
    // Русские названия мероприятий СНС УлГТУ
    const eventNames = [
      'Научная конференция СНС УлГТУ',
      'Проектный хакатон «Connect»',
      'День открытых дверей',
      'Встреча с молодыми учёными',
      'Летняя школа исследователей',
      'Семинар по цифровым технологиям',
      'Турнир по программированию',
      'Мастер-класс по робототехнике',
      'Воркшоп по стартапам',
      'Фестиваль науки',
      'Интеллектуальная игра «Что? Где? Когда?»',
      'Встреча с выпускниками',
      'День первокурсника',
      'Зимняя школа СНС',
      'Лабораторный интенсив',
      'Тренинг по командной работе',
      'День карьеры',
      'Научно-популярная лекция',
      'Экскурсия в лабораторию',
      'День волонтёра',
      'Семинар по soft skills',
      'Встреча с работодателями',
      'День науки',
      'Форум молодых исследователей',
      'Вечер вопросов и ответов',
      'День открытых инноваций',
      'Круглый стол по науке',
      'День инженерных проектов',
      'Встреча с руководством УлГТУ',
      'День СНС',
      'Мастер-класс по презентациям',
      'День цифровых решений',
      'Воркшоп по искусственному интеллекту',
      'День проектных команд',
      'Семинар по научной коммуникации',
      'День открытых лабораторий',
      'Встреча с партнёрами',
      'День профориентации',
      'День открытых дверей для школьников',
      'День инноваций',
      'День научных открытий',
      'День инженерного творчества',
      'День студенческих инициатив',
      'День научных достижений',
      'День проектных презентаций',
      'День научных дебатов',
      'День открытых лекций',
      'День научных стартапов',
      'День научного творчества',
      'День СНС УлГТУ'
    ];
    return eventNames[imageNumber - 1] || 'Мероприятие СНС УлГТУ';
  }

  private generateEventDescriptionRu(imageNumber: number): string {
    // Русские описания мероприятий СНС УлГТУ
    const descriptions = [
      'Ежегодная конференция молодых исследователей, организованная СНС УлГТУ.',
      'Интенсив для студентов, направленный на разработку цифровых решений.',
      'Презентация возможностей СНС для новых участников.',
      'Обсуждение научных трендов с молодыми учёными.',
      'Летняя образовательная программа для будущих исследователей.',
      'Практический семинар по современным цифровым технологиям.',
      'Соревнование по программированию среди студентов.',
      'Практикум по созданию и программированию роботов.',
      'Воркшоп по запуску и развитию стартапов.',
      'Праздник науки и инноваций для всех студентов.',
      'Интеллектуальное состязание для команд СНС.',
      'Встреча с успешными выпускниками УлГТУ.',
      'Знакомство первокурсников с деятельностью СНС.',
      'Зимняя образовательная школа для участников СНС.',
      'Практические занятия в лабораториях университета.',
      'Тренинг по развитию командных навыков.',
      'Ярмарка вакансий и встреча с работодателями.',
      'Популярная лекция о современных научных открытиях.',
      'Экскурсия в ведущие лаборатории УлГТУ.',
      'День благодарности волонтёрам СНС.',
      'Семинар по развитию гибких навыков.',
      'Встреча студентов с представителями компаний.',
      'Праздник науки и творчества.',
      'Форум для обмена опытом между молодыми исследователями.',
      'Открытый диалог с экспертами и студентами.',
      'День презентации инновационных проектов.',
      'Дискуссия о будущем науки и образования.',
      'Демонстрация инженерных проектов студентов.',
      'Встреча с руководством университета и СНС.',
      'Праздничное мероприятие для всех участников СНС.',
      'Практикум по эффективным презентациям.',
      'День внедрения цифровых решений в науку.',
      'Воркшоп по искусственному интеллекту и машинному обучению.',
      'День формирования и развития проектных команд.',
      'Семинар по научной коммуникации и популяризации науки.',
      'Открытые лабораторные занятия для студентов.',
      'Встреча с индустриальными партнёрами СНС.',
      'День профориентации для студентов и школьников.',
      'Экскурсия и мастер-классы для школьников.',
      'День инноваций и новых технологий.',
      'Праздник научных открытий и достижений.',
      'День инженерного творчества и изобретательства.',
      'День студенческих инициатив и проектов.',
      'День научных достижений студентов СНС.',
      'Презентация лучших проектных работ.',
      'Дебаты на актуальные научные темы.',
      'Открытые лекции ведущих учёных.',
      'Презентация стартапов студентов СНС.',
      'День творческих научных проектов.',
      'Праздник СНС УлГТУ — вместе к новым вершинам!'
    ];
    return descriptions[imageNumber - 1] || 'Мероприятие СНС УлГТУ.';
  }

  private generateEventDateRu(imageNumber: number): string {
    // Русские даты для мероприятий (примерно распределены по учебному году)
    const eventDates = [
      '10 сентября 2025',
      '15 октября 2025',
      '20 октября 2025',
      '5 ноября 2025',
      '15 ноября 2025',
      '25 ноября 2025',
      '1 декабря 2025',
      '10 декабря 2025',
      '15 декабря 2025',
      '20 декабря 2025',
      '10 января 2026',
      '15 января 2026',
      '20 января 2026',
      '25 января 2026',
      '1 февраля 2026',
      '10 февраля 2026',
      '15 февраля 2026',
      '20 февраля 2026',
      '25 февраля 2026',
      '1 марта 2026',
      '10 марта 2026',
      '15 марта 2026',
      '20 марта 2026',
      '25 марта 2026',
      '1 апреля 2026',
      '10 апреля 2026',
      '15 апреля 2026',
      '20 апреля 2026',
      '25 апреля 2026',
      '1 мая 2026',
      '10 мая 2026',
      '15 мая 2026',
      '20 мая 2026',
      '25 мая 2026',
      '1 июня 2026',
      '10 июня 2026',
      '15 июня 2026',
      '20 июня 2026',
      '25 июня 2026',
      '1 июля 2026',
      '10 июля 2026',
      '15 июля 2026',
      '20 июля 2026',
      '25 июля 2026',
      '1 августа 2026',
      '10 августа 2026',
      '15 августа 2026',
      '20 августа 2026',
      '25 августа 2026',
      '1 сентября 2026'
    ];
    return eventDates[imageNumber - 1] || '2025';
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private loadCurrentPage(): void {
    const startIndex = (this.currentPage - 1) * this.imagesPerPage;
    const endIndex = startIndex + this.imagesPerPage;
    this.currentPageImages = this.allImages.slice(startIndex, endIndex);
  }

  // Pagination methods - Completely rewritten for reliability
  goToPage(page: number): void {
    // Simple validation and immediate page switch
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      console.log(`Switching from page ${this.currentPage} to page ${page}`);

      // Immediate page change without any animation state blocking
      this.currentPage = page;
      this.loadCurrentPage();

      console.log(`Successfully switched to page ${this.currentPage}`);
      console.log(`Loaded ${this.currentPageImages.length} images for page ${page}`);
    }
  }

  // Modal methods - Rewritten for instant display
  openImageModal(image: GalleryImage): void {
    console.log('Opening modal for image:', image.fileName);

    // Immediate state changes
    this.selectedImage = image;
    this.showModal = true;

    if (isPlatformBrowser(this.platformId)) {
      // Immediate DOM changes
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift

      console.log('Modal opened successfully');
    }
  }

  closeImageModal(): void {
    console.log('Closing modal');

    // Immediate state changes
    this.showModal = false;
    this.selectedImage = null;

    if (isPlatformBrowser(this.platformId)) {
      // Restore body scroll
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';

      console.log('Modal closed successfully');
    }
  }

  // Utility methods
  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  trackByImageId(index: number, image: GalleryImage): number {
    return image.id;
  }

  scrollToGallery(): void {
    if (isPlatformBrowser(this.platformId)) {
      const galleryElement = document.getElementById('gallery-grid');
      if (galleryElement) {
        // Enhanced smooth scrolling with offset for better positioning
        const elementPosition = galleryElement.offsetTop;
        const offsetPosition = elementPosition - 80; // Account for navbar height

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
