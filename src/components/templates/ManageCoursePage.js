"use client";

/**
 * ManageCoursePage
 * - Two-stage: Course list -> Course editor
 * - Proper RTL with Emotion Cache + stylis-plugin-rtl
 *
 * Required packages:
 *   @mui/material @mui/icons-material @emotion/react @emotion/cache stylis-plugin-rtl
 *
 * If stylis-plugin-rtl is not installed:
 *   npm i stylis-plugin-rtl
 */

import React, { useEffect, useMemo, useState } from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisPluginRtl from "stylis-plugin-rtl";

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Upload as UploadIcon,
  ExpandMore as ExpandMoreIcon,
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
  VideoLibrary as VideoLibraryIcon,
} from "@mui/icons-material";

/* ---------- helpers ---------- */

const generateId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

/* ------------ Sample data (for editing/testing) ------------- */

const SAMPLE_COURSES = [
  {
    id: "course_1",
    title: "دوره React پیشرفته",
    description: "آموزش جامع React، Hooks، و معماری مدرن",
    chapters: [
      {
        id: "ch_1",
        title: "فصل ۱ — مقدمات",
        lessons: [
          { id: "l_1", title: "آشنایی با JSX", videoUrl: "" },
          { id: "l_2", title: "کامپوننت‌ها", videoUrl: "" },
        ],
      },
      {
        id: "ch_2",
        title: "فصل ۲ — مدیریت حالت",
        lessons: [
          { id: "l_3", title: "useState & useEffect", videoUrl: "" },
          { id: "l_4", title: "Context API", videoUrl: "" },
        ],
      },
    ],
  },
  {
    id: "course_2",
    title: "دوره Node.js مقدماتی",
    description: "شروع برنامه‌نویسی سمت سرور با Node.js",
    chapters: [
      {
        id: "ch_3",
        title: "فصل ۱ — محیط توسعه",
        lessons: [
          { id: "l_5", title: "نصب Node.js", videoUrl: "" },
          { id: "l_6", title: "ساخت سرور ساده", videoUrl: "" },
        ],
      },
    ],
  },
];

/* -------------------- CourseCard (list item) -------------------- */

function CourseCard({ course, onManage }) {
  return (
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <VideoLibraryIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" component="div">
              {course.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.description}
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" color="text.secondary">
          {course.chapters?.length ?? 0} فصل —{" "}
          {course.chapters?.reduce((acc, c) => acc + (c.lessons?.length ?? 0), 0)} درس
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button size="small" onClick={() => onManage(course)} startIcon={<EditIcon />}>
          مدیریت
        </Button>
      </CardActions>
    </Card>
  );
}

/* -------------------- CourseEditor (editor UI) -------------------- */

function CourseEditor({ initialCourse, onBack, onSave }) {
  const [course, setCourse] = useState(() => {
    // normalize initial data and add internal fields for uploads
    const c = initialCourse
      ? {
          ...initialCourse,
          chapters: (initialCourse.chapters || []).map((ch) => ({
            id: ch.id ?? generateId(),
            title: ch.title ?? "",
            lessons: (ch.lessons || []).map((ls) => ({
              id: ls.id ?? generateId(),
              title: ls.title ?? "",
              videoUrl: ls.videoUrl ?? "",
              videoFile: null,
              _preview: null,
            })),
          })),
        }
      : {
          id: generateId(),
          title: "",
          description: "",
          chapters: [],
        };
    return c;
  });

  // cleanup previews on unmount
  useEffect(() => {
    return () => {
      course.chapters.forEach((ch) =>
        ch.lessons.forEach((ls) => {
          if (ls._preview) URL.revokeObjectURL(ls._preview);
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTitle = (v) => setCourse((s) => ({ ...s, title: v }));
  const setDescription = (v) => setCourse((s) => ({ ...s, description: v }));

  const addChapter = () =>
    setCourse((s) => ({
      ...s,
      chapters: [...s.chapters, { id: generateId(), title: "", lessons: [] }],
    }));

  const removeChapter = (chapterId) =>
    setCourse((s) => ({ ...s, chapters: s.chapters.filter((c) => c.id !== chapterId) }));

  const updateChapterTitle = (chapterId, title) =>
    setCourse((s) => ({
      ...s,
      chapters: s.chapters.map((c) => (c.id === chapterId ? { ...c, title } : c)),
    }));

  const addLesson = (chapterId) =>
    setCourse((s) => ({
      ...s,
      chapters: s.chapters.map((c) =>
        c.id === chapterId
          ? { ...c, lessons: [...c.lessons, { id: generateId(), title: "", videoUrl: "", videoFile: null, _preview: null }] }
          : c
      ),
    }));

  const removeLesson = (chapterId, lessonId) =>
    setCourse((s) => ({
      ...s,
      chapters: s.chapters.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              lessons: c.lessons.filter((l) => {
                if (l.id === lessonId && l._preview) URL.revokeObjectURL(l._preview);
                return l.id !== lessonId;
              }),
            }
          : c
      ),
    }));

  const updateLessonField = (chapterId, lessonId, field, value) =>
    setCourse((s) => ({
      ...s,
      chapters: s.chapters.map((c) =>
        c.id === chapterId
          ? { ...c, lessons: c.lessons.map((l) => (l.id === lessonId ? { ...l, [field]: value } : l)) }
          : c
      ),
    }));

  const handleFileSelect = (chapterId, lessonId, file) => {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setCourse((s) => ({
      ...s,
      chapters: s.chapters.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              lessons: c.lessons.map((l) => {
                if (l.id === lessonId) {
                  if (l._preview) URL.revokeObjectURL(l._preview);
                  return { ...l, videoFile: file, videoUrl: "", _preview: preview };
                }
                return l;
              }),
            }
          : c
      ),
    }));
  };

  const removeSelectedFile = (chapterId, lessonId) =>
    setCourse((s) => ({
      ...s,
      chapters: s.chapters.map((c) =>
        c.id === chapterId
          ? {
              ...c,
              lessons: c.lessons.map((l) => {
                if (l.id === lessonId) {
                  if (l._preview) URL.revokeObjectURL(l._preview);
                  return { ...l, videoFile: null, _preview: null };
                }
                return l;
              }),
            }
          : c
      ),
    }));

  const validate = () => {
    if (!course.title.trim()) return "عنوان دوره را وارد کنید.";
    for (const ch of course.chapters) {
      if (!ch.title.trim()) return "عنوان یک یا چند فصل خالی است.";
      for (const ls of ch.lessons) {
        if (!ls.title.trim()) return "عنوان یک یا چند درس خالی است.";
        if (!ls.videoUrl && !ls.videoFile) return "برای هر درس آدرس یا فایل ویدیویی تعیین کنید.";
      }
    }
    return null;
  };

  const handleSave = () => {
    const err = validate();
    if (err) {
      alert(err);
      return;
    }
    // ساختار خروجی: فایل‌ها به عنوان File در videoFile قرار دارند
    const payload = JSON.parse(JSON.stringify(course, (k, v) => {
      // remove internal preview from serializing
      if (k === "_preview") return undefined;
      return v;
    }));
    // attach files separately if میخوای
    // console.log(course) includes videoFile as File objects
    if (onSave) onSave(course);
    alert("دادهٔ دوره آماده شد — چک کن console.log");
    console.log("FINAL COURSE OBJECT:", course);
  };

  return (
    <Box>
      <Box mb={2} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} variant="outlined">
          بازگشت به لیست دوره‌ها
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button onClick={handleSave} variant="contained" startIcon={<AddIcon />}>
          ذخیره تغییرات
        </Button>
      </Box>

      <Card variant="outlined" sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField fullWidth label="عنوان دوره" value={course.title} onChange={(e) => setTitle(e.target.value)} dir="rtl" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField fullWidth label="تعداد فصل" value={course.chapters.length} disabled dir="rtl" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="توضیحات دوره" value={course.description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} dir="rtl" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box mb={2} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">فصل‌ها</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={addChapter}>
          افزودن فصل
        </Button>
      </Box>

      <Stack spacing={2}>
        {course.chapters.length === 0 && (
          <Typography color="text.secondary">هنوز فصلی اضافه نشده — از دکمه افزودن فصل استفاده کنید.</Typography>
        )}

        {course.chapters.map((chapter, ci) => (
          <Accordion key={chapter.id} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
                <TextField
                  placeholder={`عنوان فصل ${ci + 1}`}
                  value={chapter.title}
                  onChange={(e) => updateChapterTitle(chapter.id, e.target.value)}
                  sx={{ flexGrow: 1 }}
                  dir="rtl"
                />
                <IconButton color="error" onClick={() => removeChapter(chapter.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Stack spacing={1}>
                {chapter.lessons.length === 0 && (
                  <Typography color="text.secondary">هنوز درسی اضافه نشده — افزودن درس در پایین</Typography>
                )}

                {chapter.lessons.map((ls, li) => (
                  <Card key={ls.id} variant="outlined" sx={{ p: 1 }}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={12} md={4}>
                        <TextField
                          label={`عنوان درس ${li + 1}`}
                          value={ls.title}
                          onChange={(e) => updateLessonField(chapter.id, ls.id, "title", e.target.value)}
                          fullWidth
                          dir="rtl"
                        />
                      </Grid>

                      <Grid item xs={12} md={5}>
                        <TextField
                          label="آدرس ویدیو (یا آپلود فایل)"
                          value={ls.videoUrl}
                          onChange={(e) => updateLessonField(chapter.id, ls.id, "videoUrl", e.target.value)}
                          fullWidth
                          disabled={!!ls.videoFile}
                          dir="rtl"
                        />
                      </Grid>

                      <Grid item xs={12} md={3} sx={{ textAlign: "left" }}>
                        <input
                          id={`file-${chapter.id}-${ls.id}`}
                          type="file"
                          accept="video/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            handleFileSelect(chapter.id, ls.id, f);
                          }}
                        />
                        <label htmlFor={`file-${chapter.id}-${ls.id}`}>
                          <Button component="span" variant="outlined" startIcon={<UploadIcon />}>
                            آپلود ویدیو
                          </Button>
                        </label>

                        {ls.videoFile && (
                          <Chip
                            label={ls.videoFile.name}
                            onDelete={() => removeSelectedFile(chapter.id, ls.id)}
                            color="info"
                            sx={{ mr: 1, mt: 1 }}
                          />
                        )}
                        {!ls.videoFile && ls.videoUrl && <Chip label="آدرس تنظیم‌شده" color="success" sx={{ mr: 1, mt: 1 }} />}
                      </Grid>

                      <Grid item xs={12}>
                        {ls._preview ? (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption">پیش‌نمایش ویدیو آپلود شده:</Typography>
                            <video src={ls._preview} controls style={{ width: "100%", marginTop: 6, borderRadius: 8 }} />
                          </Box>
                        ) : ls.videoUrl ? (
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption">پیش‌نمایش از آدرس:</Typography>
                            <video src={ls.videoUrl} controls style={{ width: "100%", marginTop: 6, borderRadius: 8 }} />
                          </Box>
                        ) : null}
                      </Grid>

                      <Grid item xs={12} sx={{ textAlign: "left" }}>
                        <Button startIcon={<AddIcon />} variant="outlined" size="small" onClick={() => addLesson(chapter.id)} sx={{ mr: 1 }}>
                          افزودن درس
                        </Button>
                        <Button startIcon={<DeleteIcon />} variant="text" color="error" size="small" onClick={() => removeLesson(chapter.id, ls.id)}>
                          حذف درس
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                ))}

                <Box>
                  <Button startIcon={<AddIcon />} variant="contained" onClick={() => addLesson(chapter.id)}>
                    افزودن درس جدید به این فصل
                  </Button>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Box>
  );
}


export default function ManageCoursePageWrapper() {
  // Emotion cache with RTL plugin
  const cacheRtl = useMemo(
    () =>
      createCache({
        key: "mui-rtl",
        stylisPlugins: [stylisPluginRtl],
      }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        direction: "rtl",
        typography: { fontFamily: "'Vazir', 'IRANYekan', sans-serif" },
        palette: { mode: "light", primary: { main: "#5d87ff" } },
      }),
    []
  );

  const [courses, setCourses] = useState(() => SAMPLE_COURSES);
  const [stage, setStage] = useState("list"); // 'list' | 'edit'
  const [editingCourse, setEditingCourse] = useState(null);

  const handleManage = (course) => {
    setEditingCourse(course);
    setStage("edit");
  };

  const handleBackToList = () => {
    setEditingCourse(null);
    setStage("list");
  };

  const handleSaveCourse = (updatedCourse) => {
    setCourses((prev) => {
      const found = prev.find((c) => c.id === updatedCourse.id);
      if (found) {
        return prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
      }
      return [...prev, updatedCourse];
    });
    alert("دوره ذخیره شد (برای نمونه در state محلی ذخیره شد).");
    setStage("list");
  };

  const handleCreateNew = () => {
    const newCourse = {
      id: generateId(),
      title: "دوره جدید",
      description: "",
      chapters: [],
    };
    setEditingCourse(newCourse);
    setStage("edit");
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box component="main" sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f7f9fc", minHeight: "100vh", direction: "ltr" }}>
          <Box maxWidth="1200px" mx="auto">
            <Box mb={3} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                مدیریت دوره‌ها
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              {stage === "list" && (
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateNew}>
                  ایجاد دوره جدید
                </Button>
              )}
            </Box>

            {stage === "list" && (
              <Grid container spacing={2}>
                {courses.map((c) => (
                  <Grid item xs={12} sm={6} md={4} key={c.id}>
                    <CourseCard course={c} onManage={handleManage} />
                  </Grid>
                ))}
              </Grid>
            )}

            {stage === "edit" && editingCourse && (
              <Box mt={2}>
                <CourseEditor
                  initialCourse={editingCourse}
                  onBack={handleBackToList}
                  onSave={(courseObj) => {
                    handleSaveCourse(courseObj);
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}
