// Standalone probe spawned as its own Node process with a controlled TZ
// environment variable, so `formatJalaliDate`'s timezone independence can be
// tested against a real, different local timezone rather than only reasoned
// about. Imports through the package's own name — the same resolution path
// a consumer's `pnpm install` would use — not a relative path into dist/.
import { formatJalaliDate } from "@zakhmban/ui/utils/format";

const results = {
  fromDateInstant: formatJalaliDate(new Date("2025-08-05T00:00:00Z")),
  fromIsoString: formatJalaliDate("2025-08-05"),
  fromCalendarObject: formatJalaliDate({ year: 2025, month: 8, day: 5 }),
  hostTimezoneOffsetMinutes: new Date().getTimezoneOffset(),
};

process.stdout.write(JSON.stringify(results));
