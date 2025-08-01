import Swal from 'sweetalert2'

export function useToast() {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  })

  return {
    success: (message: string) => toast.fire({ icon: 'success', title: message }),
    error: (message: string) => toast.fire({ icon: 'error', title: message }),
    info: (message: string) => toast.fire({ icon: 'info', title: message }),
  }
}
