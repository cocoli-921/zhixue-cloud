import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
import { Lesson } from '../courses/lesson.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { Question } from '../quizzes/question.entity';
import { CourseStatus, QuizStatus, UserRole } from '../common/enums';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Course) private readonly courses: Repository<Course>,
    @InjectRepository(Lesson) private readonly lessons: Repository<Lesson>,
    @InjectRepository(Quiz) private readonly quizzes: Repository<Quiz>,
    @InjectRepository(Question) private readonly questions: Repository<Question>,
  ) {}

  async onModuleInit() {
    const count = await this.users.count();
    if (count === 0) {
      await this.users.save([
        this.users.create({
          name: '林同学',
          email: 'student@zhixue.local',
          passwordHash: await bcrypt.hash('Student123!', 12),
          role: UserRole.STUDENT,
          profile: { major: '软件工程' },
        }),
        this.users.create({
          name: '王老师',
          email: 'teacher@zhixue.local',
          passwordHash: await bcrypt.hash('Teacher123!', 12),
          role: UserRole.INSTRUCTOR,
          profile: { department: '软件工程' },
        }),
        this.users.create({
          name: '系统管理员',
          email: 'admin@zhixue.local',
          passwordHash: await bcrypt.hash('Admin123!', 12),
          role: UserRole.ADMIN,
          profile: null,
        }),
      ]);
    }

    if (await this.courses.count() === 0) {
      const courseData = [
        ['HTML/CSS 网页设计入门', '从标签、选择器到响应式页面', 'HTML,CSS,前端', 24],
        ['JavaScript 编程基础', '从变量、函数到网页交互', 'JavaScript,编程基础', 18],
        ['Python 零基础入门', '从变量、条件判断到小程序', 'Python,编程基础', 16],
        ['Git 版本控制入门', '掌握提交、分支和团队协作', 'Git,工程基础', 22],
        ['SQL 数据库基础', '学会查询、筛选和管理数据', 'SQL,数据库', 12],
        ['软件测试基础', '理解测试用例、缺陷和质量保障', '测试,软件工程', 20],
      ];
      for (const [title, description, tags, lessonCount] of courseData) {
        const course = await this.courses.save(this.courses.create({
          title: String(title),
          description: String(description),
          tags: String(tags),
          price: 0,
          rating: 4.8,
          status: CourseStatus.PUBLISHED,
        }));
        const lessons = Array.from({ length: Number(lessonCount) }, (_, index) =>
          this.lessons.create({
            courseId: course.id,
            title: '第 ' + (index + 1) + ' 课 · ' + String(title),
            orderNumber: index + 1,
            contentUrl: null,
            isPublished: true,
          }),
        );
        await this.lessons.save(lessons);
      }
    }

    if ((await this.quizzes.count()) === 0) {
      const quiz = await this.quizzes.save(
        this.quizzes.create({
          title: '网页基础知识测验',
          courseId: null,
          status: QuizStatus.PUBLISHED,
        }),
      );
      await this.questions.save(
        [
          {
            content: '网页中用来描述页面结构的基础元素是？',
            options: ['HTML 标签', 'CSS 选择器', 'JavaScript 函数'],
            answer: 'A',
          },
          {
            content: '组件重新渲染通常与什么变化有关？',
            options: ['页面结构或样式变化', '浏览器标题', '图片大小'],
            answer: 'A',
          },
          {
            content: 'CSS 中用来选中类选择器的符号是？',
            options: ['#', '.', '$'],
            answer: 'B',
          },
          {
            content: '用于给网页添加交互逻辑的语言是？',
            options: ['HTML', 'CSS', 'JavaScript'],
            answer: 'C',
          },
          {
            content: '以下哪个是语义化标签？',
            options: ['<div>', '<header>', '<span>'],
            answer: 'B',
          },
        ].map((q) =>
          this.questions.create({
            quizId: quiz.id,
            content: q.content,
            options: q.options,
            answer: q.answer,
          }),
        ),
      );
    }
  }
}
