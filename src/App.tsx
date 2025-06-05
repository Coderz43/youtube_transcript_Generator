import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileText, Languages, Youtube, Wand2, Users, BookOpen, Mic2, GraduationCap, CheckCircle2, ChevronDown, ChevronRight, Sun, Moon, Laptop2, History, PlaySquare, List, Table, Apple as Api, UserCircle, Clock, Play, Search, MoreVertical } from 'lucide-react';
import AdminRoutes from './pages/admin';
import { useTheme } from './ThemeContext';
import { fetchTranscript, extractVideoId } from './api/transcript';
import TranscriptPage from './pages/TranscriptPage';

// ... rest of the file remains unchanged ...