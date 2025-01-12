import Swal from 'sweetalert2';
import { twMerge } from 'tailwind-merge';

const styles = {
  title: 'text-slate-800 text-xl leading-tight font-semibold',
  htmlContainer: 'text-slate-600 text-base font-normal',
  actions: 'flex gap-4',
  baseButton:
    'h-10 font-semibold text-sm ps-3 pe-3 rounded transition duration-200',
};

const SuccessDialog = Swal.mixin({
  icon: 'success',
  customClass: {
    title: styles.title,
    htmlContainer: styles.htmlContainer,
    actions: styles.actions,
    confirmButton: twMerge(
      styles.baseButton,
      'text-white bg-primary-400 ring-1 ring-primary-400 hover:bg-primary-500 hover:ring-2 hover:ring-primary-500',
    ),
    cancelButton: twMerge(
      styles.baseButton,
      'text-slate-600 bg-transparent ring-1 ring-slate-400 hover:bg-slate-200 hover:ring-2 hover:ring-slate-400',
    ),
  },
  buttonsStyling: false,
});

const AlertDialog = Swal.mixin({
  icon: 'warning',
  customClass: {
    title: styles.title,
    htmlContainer: styles.htmlContainer,
    actions: styles.actions,
    confirmButton: twMerge(
      styles.baseButton,
      'text-white bg-primary-400 ring-1 ring-primary-400 hover:bg-primary-500 hover:ring-2 hover:ring-primary-500',
    ),
    cancelButton: twMerge(
      styles.baseButton,
      'text-slate-600 bg-transparent ring-1 ring-slate-400 hover:bg-slate-200 hover:ring-2 hover:ring-slate-400',
    ),
  },
  buttonsStyling: false,
});

export const ConfirmDialog = Swal.mixin({
  icon: 'question',
  showCancelButton: true,
  customClass: {
    title: styles.title,
    htmlContainer: styles.htmlContainer,
    actions: styles.actions,
    confirmButton: twMerge(
      styles.baseButton,
      'text-white bg-primary-400 ring-1 ring-primary-400 hover:bg-primary-500 hover:ring-2 hover:ring-primary-500',
    ),
    cancelButton: twMerge(
      styles.baseButton,
      'text-slate-600 bg-transparent ring-1 ring-slate-400 hover:bg-slate-200 hover:ring-2 hover:ring-slate-400',
    ),
  },
  buttonsStyling: false,
});

export const ConfirmDelete = Swal.mixin({
  icon: 'warning',
  showCancelButton: true,
  customClass: {
    title: styles.title,
    htmlContainer: styles.htmlContainer,
    actions: styles.actions,
    confirmButton: twMerge(
      styles.baseButton,
      'text-white bg-red-400 ring-1 ring-red-400 hover:bg-red-500 hover:ring-2 hover:ring-red-500',
    ),
    cancelButton: twMerge(
      styles.baseButton,
      'text-slate-600 bg-transparent ring-1 ring-slate-400 hover:bg-slate-200 hover:ring-2 hover:ring-slate-400',
    ),
  },
  buttonsStyling: false,
});

export const ErrorDialog = Swal.mixin({
  icon: 'error',
  confirmButtonText: 'Fechar',
  customClass: {
    title: styles.title,
    htmlContainer: styles.htmlContainer,
    actions: styles.actions,
    confirmButton: twMerge(
      styles.baseButton,
      'text-white bg-red-400 ring-1 ring-red-400 hover:bg-red-500 hover:ring-2 hover:ring-red-500',
    ),
    cancelButton: twMerge(
      styles.baseButton,
      'text-slate-600 bg-transparent ring-1 ring-slate-400 hover:bg-slate-200 hover:ring-2 hover:ring-slate-400',
    ),
  },
  buttonsStyling: false,
});

export const Dialog = {
  Success: SuccessDialog,
  Alert: AlertDialog,
  Confirm: ConfirmDialog,
  ConfirmDelete,
  Error: ErrorDialog,
};
