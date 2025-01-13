import { HOME_ROUTES } from '../features/home/navigation';

const path = {
  Initial: {
    HOME_ROUTES,
    All: '*',
  },
} as const;

export { path };
