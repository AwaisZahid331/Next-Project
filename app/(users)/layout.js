import '../globals.css';
import ConditionalNav from '@/components/ConditionalNav'
import { ReduxProvider } from '@/store'

export  default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReduxProvider>
          <ConditionalNav />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}