/**
 * Formata um horário para o padrão brasileiro (HH:mm).
 * Aceita Date, ISO String ou qualquer valor compatível com new Date().
 */
export function formatTime(time) {
  if (!time) {
    return '-';
  }

  const parsedTime = new Date(time);

  if (!Number.isNaN(parsedTime.getTime())) {
    return parsedTime.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  // Caso já seja uma string no formato HH:mm ou HH:mm:ss
  if (typeof time === 'string') {
    const partes = time.split(':');

    if (partes.length >= 2) {
      return `${partes[0].padStart(2, '0')}:${partes[1].padStart(2, '0')}`;
    }
  }

  return '-';
}

/**
 * Retorna a hora atual no formato HH:mm.
 */
export function getCurrentTime() {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Retorna a hora atual no formato HH:mm:ss.
 */
export function getCurrentTimeWithSeconds() {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Converte um horário (HH:mm ou HH:mm:ss)
 * em minutos.
 */
export function timeToMinutes(time) {
  if (!time || typeof time !== 'string') {
    return 0;
  }

  const [hours = '0', minutes = '0'] = time.split(':');

  return (
    Number(hours) * 60 +
    Number(minutes)
  );
}

/**
 * Converte minutos para HH:mm.
 */
export function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}`;
}