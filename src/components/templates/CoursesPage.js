"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Collapse,
} from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useTheme, useMediaQuery } from "@mui/material";

const fakeCourses = [
  {
    id: "course1",
    title: "دوره React پیشرفته",
    description: "آموزش جامع React و Hooks",
    chapters: [
      {
        id: "ch1",
        title: "فصل اول: مقدمات",
        lessons: [
          {
            id: "l1",
            title: "آشنایی با JSX",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          },
          {
            id: "l2",
            title: "کامپوننت‌ها در React",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          },
        ],
      },
      {
        id: "ch2",
        title: "فصل دوم: مدیریت حالت",
        lessons: [
          {
            id: "l3",
            title: "useState و useEffect",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
          },
          {
            id: "l4",
            title: "Context API",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
          },
        ],
      },
    ],
  },
  {
    id: "course2",
    title: "دوره Node.js مقدماتی",
    description: "شروع برنامه‌نویسی سمت سرور با Node.js",
    chapters: [
      {
        id: "ch3",
        title: "فصل اول: محیط توسعه",
        lessons: [
          {
            id: "l5",
            title: "نصب و راه‌اندازی Node.js",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          },
          {
            id: "l6",
            title: "ساخت اولین سرور",
            videoUrl:
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          },
        ],
      },
    ],
  },
];

export default function UserCoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setExpandedChapters({});
    setSelectedLesson(null);
  };

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        height: isSmallScreen ? "auto" : "100vh",
        bgcolor: "#f5f5f5",
        color: "#333",
        direction: "rtl",
        fontFamily: "Yekan, sans-serif",
        p: 2,
        gap: 2,
      }}
    >
      {/* لیست دوره‌ها */}
      <Paper
        elevation={3}
        sx={{
          width: isSmallScreen ? "100%" : 280,
          bgcolor: "#fff",
          borderRadius: 2,
          overflowY: "auto",
          maxHeight: isSmallScreen ? 300 : "90vh",
          p: 1,
          flexShrink: 0,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          دوره‌های من
        </Typography>
        <List>
          {fakeCourses.map((course) => (
            <ListItemButton
              key={course.id}
              selected={selectedCourse?.id === course.id}
              onClick={() => handleCourseSelect(course)}
              sx={{ textAlign: "right", borderRadius: 1, mb: 1 }}
            >
              <ListItemText
                primary={course.title}
                secondary={course.description}
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* بخش جزئیات دوره و فصول */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#fff",
          borderRadius: 2,
          overflowY: "auto",
          maxHeight: isSmallScreen ? 300 : "90vh",
          p: 2,
          display: "flex",
          flexDirection: "column",
          mb: isSmallScreen ? 2 : 0,
        }}
      >
        {!selectedCourse ? (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 6 }}>
            لطفا یک دوره را انتخاب کنید
          </Typography>
        ) : (
          <>
            <Typography
              variant="h5"
              sx={{ mb: 3, borderBottom: "2px solid #5d87ff", pb: 1 }}
            >
              {selectedCourse.title}
            </Typography>
            {selectedCourse.chapters.map((chapter) => (
              <Box key={chapter.id} sx={{ mb: 2 }}>
                <ListItemButton
                  onClick={() => toggleChapter(chapter.id)}
                  sx={{
                    bgcolor: "#e3f2fd",
                    borderRadius: 2,
                    mb: 1,
                    justifyContent: "space-between",
                    pr: 3,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {chapter.title}
                  </Typography>
                  {expandedChapters[chapter.id] ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </ListItemButton>

                <Collapse in={expandedChapters[chapter.id]} timeout="auto" unmountOnExit>
                  <List sx={{ pr: 3 }}>
                    {chapter.lessons.map((lesson) => (
                      <ListItemButton
                        key={lesson.id}
                        onClick={() => handleLessonSelect(lesson)}
                        selected={selectedLesson?.id === lesson.id}
                        sx={{
                          textAlign: "right",
                          borderRadius: 1,
                          mb: 0.5,
                        }}
                      >
                        <ListItemText primary={lesson.title} />
                        <PlayCircleOutlineIcon color="primary" />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* ویدیو پلیر */}
      <Paper
        elevation={3}
        sx={{
          width: isSmallScreen ? "100%" : 400,
          borderRadius: 2,
          bgcolor: "#fff",
          maxHeight: isSmallScreen ? 300 : "90vh",
          display: "flex",
          flexDirection: "column",
          p: 2,
          flexShrink: 0,
        }}
      >
        {selectedLesson ? (
          <>
            <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
              {selectedLesson.title}
            </Typography>
            <Box
              component="video"
              src={selectedLesson.videoUrl}
              controls
              sx={{ borderRadius: 2, height: isSmallScreen ? 180 : 250, width: "100%" }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
              ویدیوی آموزشی: {selectedLesson.title}
            </Typography>
          </>
        ) : (
          <Typography
            variant="body1"
            sx={{ mt: "auto", mb: "auto", textAlign: "center", color: "#aaa" }}
          >
            لطفا یک درس را انتخاب کنید تا ویدیو نمایش داده شود
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
