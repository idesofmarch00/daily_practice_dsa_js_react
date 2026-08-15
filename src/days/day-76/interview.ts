export const meta = {
  id: "day-76-interview",
  title: "Day 76 Interview Questions",
  prompt: "Expo App Builds, Apple Developer Account Requirements, Code Signing and Provisioning",
};

export const questions = [
  {
    question: "Does Expo Cloud App require a paid Apple Dev account for all builds?",
    answer: `No, a paid Apple Developer account ($99/year) is not required for all iOS builds, but it is generally needed if you want to run builds on physical devices or publish to the App Store.

You generally need the paid account for:
- **Physical iOS Devices:** Running a custom Development Build on your own or your testers' iPhones/iPads.
- **App Store Publishing:** Creating release builds to submit to the App Store.

You can get away without a paid account if:
- **You use the iOS Simulator:** You can build apps and test them on an emulated iOS Simulator using Xcode on a Mac without needing an Apple Developer membership.
- **You use Android:** Android allows you to build \`.apk\` or \`.aab\` files and side-load them onto devices or upload to the Google Play Store (which only requires a $25 one-time developer fee).

Yes, to download an iOS development build onto a physical device via Expo EAS Cloud Build, you must have a paid Apple Developer Account ($99/year). This restriction exists because Apple's security model dictates that any app running on a physical iPhone must be signed with an Apple Provisioning Profile. For EAS to automate this process in the cloud (using Ad Hoc provisioning), it requires access to the provisioning APIs available only with a paid Apple account. Free Apple accounts only allow local, tethered signing through a physical Mac running Xcode. Android has no such restrictions. You can build a standard \`.apk\` via EAS cloud and install it on any physical phone for free.

## EAS Cloud Build Account Requirements Matrix

| Platform | Build Type | Target Device | Paid Developer Account Required? | Notes / Mechanisms |
| --- | --- | --- | --- | --- |
| **iOS** | Internal Distribution (Dev Client / Preview) | 📱 Physical Phone | 🛑 Yes ($99/yr) | EAS uses Ad Hoc provisioning. It registers your phone's UDID to your paid Apple account automatically. |
| **iOS** | Simulator Build | 💻 Mac Simulator | 🟢 No (Free) | Generates a \`.tar.gz\` app binary compiled for x86/ARM Mac architecture. No Apple signing is required. |
| **iOS** | Production | 🚀 App Store / TestFlight | 🛑 Yes ($99/yr) | Required to generate store distribution certificates and access App Store Connect. |
| **Android** | Internal Distribution (APK) | 📱 Physical Phone | 🟢 No (Free) | EAS generates a standard \`.apk\`. Anyone can instantly install it via an Expo download link. |
| **Android** | Emulator Build | 💻 PC/Mac Emulator | 🟢 No (Free) | Uses the exact same \`.apk\` file generated for physical devices. |
| **Android** | Production (AAB) | 🚀 Google Play Store | 🛑 Yes ($25 one-time) | Required by Google to create a developer console account and upload the bundle. |`,
  },
  {
    question: "What is meant by provisioning and provisioning profile? What is code signing? What is the difference in simple and technical terms?",
    answer: `## In Simple Words

Think of your iPhone as a high-security building.
- **Signing** is like an ID badge. It proves who made the app. If a developer builds an app, they "sign" it with their digital signature. The iPhone looks at the signature and says, "Okay, I know exactly who made this."
- A **Provisioning Profile** is like a guest pass with strict rules. Even if the iPhone knows who made the app, it will not let the app run unless it has a valid guest pass. This pass lists exactly which phones the app is allowed to run on, what security permissions it has (like push notifications), and who is allowed to install it.

**The Difference (Simple):** Signing proves identity ("Who are you?"), while Provisioning defines permission ("Are you allowed to run on this specific device?"). Apple requires both before an app can open on a physical phone.

## In Technical Terms

### Code Signing
Code Signing is a cryptographic verification mechanism.
- **The Mechanism:** The developer uses a Private Key (stored on their machine or in Expo EAS) to cryptographically sign the app binary. The Public Key is embedded inside an Apple-issued digital certificate (Code Signing Certificate).
- **The Purpose:** It guarantees authenticity (the app definitely came from you) and integrity (the code has not been altered or tampered with since it was built).

### Provisioning Profile
A Provisioning Profile (\`.mobileprovision\`) is a plist configuration file issued by Apple that links developer certificates, device identifiers, and application permissions together.
- **The Components:** It acts as a container that bundles four critical pieces of data:
  1. **App ID:** The unique bundle identifier (\`com.yourcompany.app\`).
  2. **Development/Distribution Certificates:** The public keys allowed to sign the code.
  3. **UDIDs (Unique Device Identifiers):** A hardcoded list of specific physical hardware devices permitted to run the app (for Ad Hoc/Development builds).
  4. **Entitlements:** Explicit capabilities granted to the app, such as iCloud access, Push Notifications, or In-App Purchases.

### The Difference (Technical)

| Feature | Code Signing | Provisioning Profile |
| --- | --- | --- |
| **Concept** | Cryptographic signature using asymmetric key cryptography. | A signed configuration file (\`.mobileprovision\`) bundled into the app. |
| **Verification** | Validates the binary's author and ensures the code hasn't been modified. | Validates if the runtime environment matches Apple's deployment rules. |
| **Execution** | The iOS kernel checks the signature hash matching during launch. | The iOS security daemon verifies the phone's UDID exists inside the profile list. |
| **Tooling** | Done via \`codesign\` utility in Xcode / EAS build pipelines. | Generated in the Apple Developer Portal and downloaded during the build process. |`,
  },
  {
    question: "What is Ad Hoc provisioning? How to create a paid account, get the API key, and link Expo and Apple account? Are local Mac Xcode dev builds via USB signing or provisioning?",
    answer: `## What is Ad Hoc Provisioning?
Ad Hoc Provisioning is a distribution method defined by Apple that allows you to install an app directly onto up to 100 specific, registered iOS devices without publishing it to the App Store.

When Expo EAS generates an Ad Hoc build, it creates an \`.ipa\` file and embeds a Provisioning Profile containing a hardcoded list of your testers' UDIDs (Unique Device Identifiers). If an iPhone tries to open that app, iOS reads the profile; if its own UDID isn't on that list, the app will instantly crash.

## Step-by-Step Guide: Creating a Paid Apple Account & Linking to Expo EAS

**Step 1: Create a Paid Apple Developer Account**
1. Go to the Apple Developer Program or download the Apple Developer App on an iPhone/iPad.
2. Sign in with your existing Apple ID or create a new one. (Make sure Two-Factor Authentication (2FA) is turned on for your Apple ID).
3. Click Enroll and choose your entity type (Individual or Organization). Complete the identity verification steps and pay the $99/year fee.
4. Wait 24 to 48 hours for Apple to activate your account.

**Step 2: Generate the App Store Connect API Key (Best Practice)**
Instead of typing your raw Apple password into the command line, generate an API key so Expo can securely interact with Apple's servers.
1. Log into App Store Connect.
2. Navigate to Users and Access > Integrations (or Keys tab).
3. Click the Add (+) button to create a new key. Set the name to Expo EAS and grant it Admin access.
4. Click Generate. Once it appears, download the private key file (\`.p8\`). Save it securely.
5. Copy the Issuer ID and the Key ID from that same screen.

**Step 3: Link Your Apple Account to Expo EAS**
1. Open your terminal inside your project directory. Ensure you are logged into your Expo account (\`eas login\`).
2. Initialize your project's build settings if you haven't already: \`eas build:configure\`
3. Run the credentials manager command: \`eas credentials\`
4. Select iOS > development (or production).
5. When prompted for your Apple credentials, select the option to provide an App Store Connect API Key.
6. Paste your Issuer ID, Key ID, and upload the downloaded \`.p8\` file when asked. Expo will securely save these keys in its encrypted cloud vault, linking your accounts permanently.

## Local Mac via USB vs. Online EAS Cloud Build

**The Clarification:** Signing and provisioning both happen in both methods. The difference isn't what is being done, but who does the heavy lifting and which rules apply.

**1. Local Dev via USB (Physical Mac + Xcode)**
When you connect an iPhone to your Mac via USB and press "Play" in Xcode, Xcode automates both signing and provisioning locally for free.
- **The Loophole:** Apple treats this as active local debugging. Xcode generates a temporary "Development" provisioning profile locally, registers your plugged-in iPhone's UDID automatically, signs it with a local free developer certificate, and pushes it over the wire.
- **The Catch:** The app will expire and stop opening after roughly 7 days if your phone disconnects from the Mac. You cannot send this file over the internet to a remote friend to install.

**2. Online Dev via Expo EAS Cloud Build**
When you build in the cloud, there is no USB cable linking Expo’s remote server to your physical iPhone.
- **The Reality:** Expo has to generate a standalone file (\`.ipa\`) that can live out on the internet for your testers to download over-the-air.
- **The Catch:** To make an over-the-air installer file, Apple forces the use of Ad Hoc Distribution profiles instead of a local USB debug profile. Apple blocks free accounts from generating Ad Hoc distribution profiles. Therefore, Expo cannot complete the build without your paid account permissions.

## What Expo EAS Does Automating Signing and Provisioning Behind the Scenes
When you trigger \`eas build --platform ios\`, Expo executes the entire architecture seamlessly:
1. **Identifier Registration:** Expo reads your app.json for your bundleIdentifier. It pings the Apple Portal to claim and register this unique ID.
2. **Device Registration:** Expo fetches the UDID of your phone and registers it into your Apple Developer Portal account.
3. **Fetching the Profile (Provisioning):** Expo requests Apple to create an Ad Hoc Provisioning Profile containing your Bundle ID and your registered UDID list. It downloads this \`.mobileprovision\` file.
4. **Acquiring the Certificate (Signing):** Expo creates a cryptographic Distribution Certificate (\`.p12\` file) via Apple, which acts as the official master pen for signing.
5. **Compilation & Assembly:** The cloud server compiles your React Native Javascript and native iOS code into a raw binary application bundle.
6. **Executing Code Signing:** The build machine takes your Distribution Certificate and runs a terminal tool called \`codesign\`. It hashes every file in the app and stamps it with your digital signature.
7. **Injecting the Profile:** The downloaded Ad Hoc Provisioning Profile file is injected directly inside the app bundle directory.
8. **Final Packaging:** The entire signed and provisioned directory is compressed into a final \`.ipa\` installer file and delivered to your phone via a convenient download page.`,
  },
  {
    question: "Can we create prod build using expo cli locally in Mac and upload it to App Store Connect, or do we add it to Expo? Explain Android local and online builds and differences.",
    answer: `## iOS Production: Local Mac vs. EAS Cloud
Yes, you can build your production iOS app locally on a Mac without sending your code to Expo's cloud servers. However, you must use EAS CLI (\`eas build --local\`) rather than the old deprecated \`expo cli\` commands.

- **Local Production Build (Mac)**
  - **Requirements:** A Mac with Xcode installed, fast internet, and high hardware specs.
  - **Command:** Run \`eas build --platform ios --profile production --local\`.
  - **Process:** Your local Mac downloads your credentials, compiles the native Swift/Objective-C code, signs the app binary using your keys, and outputs a \`.ipa\` file on your desktop.
  - **Uploading to Apple:** You must manually open Xcode Transporter (a free Mac App Store utility) or use Xcode, drag your \`.ipa\` file into it, and upload it to App Store Connect.
- **Online Production Build (EAS Cloud)**
  - **Requirements:** Any computer (Windows, Linux, or Mac). No Xcode needed.
  - **Command:** Run \`eas build --platform ios --profile production\`.
  - **Process:** Your project files are zipped and sent to Expo's remote macOS servers. Expo compiles the code, signs it with your uploaded Apple credentials, and hosts the \`.ipa\` file.
  - **Uploading to Apple:** You can add the \`--auto-submit\` flag, and Expo will instantly push the finished build directly into App Store Connect for you.

## Android Production: Local vs. EAS Cloud
Android follows an almost identical workflow, but it is vastly more flexible because it does not require a Mac. Android production builds output a \`.aab\` (Android App Bundle) file.

- **Local Production Build (Windows/Mac/Linux)**
  - **Requirements:** Java Development Kit (JDK) and Android SDK installed on your machine.
  - **Command:** Run \`eas build --platform android --profile production --local\`.
  - **Process:** Your machine runs Gradle locally to compile the Kotlin/Java code. It uses a local keystore file (\`.jks\`) to sign the app.
  - **Uploading to Google:** You must open the Google Play Console in your web browser, navigate to your release dashboard, and manually drag-and-drop the generated \`.aab\` file into the upload box.
- **Online Production Build (EAS Cloud)**
  - **Requirements:** Any operating system. No local Android setup required.
  - **Command:** Run \`eas build --platform android --profile production\`.
  - **Process:** Expo’s cloud servers spin up a Linux instance, compile your project via Gradle, and sign it securely with your credentials.
  - **Uploading to Google:** Just like iOS, adding \`--auto-submit\` allows Expo to automatically upload the \`.aab\` straight into your Google Play Console track.

## Summary of Differences
| Feature | 💻 Local Build (\`--local\`) | ☁️ EAS Cloud Build |
| --- | --- | --- |
| **Machine Specs** | Consumes massive local CPU, RAM, and time. | Offloads heavy compilation to remote servers. |
| **OS Restrictions** | iOS builds require a Mac; Android works anywhere. | Build iOS on Windows/Linux; no hardware limits. |
| **Store Upload** | Manual upload via Transporter (iOS) or Play Console web (Android). | Fully automated upload straight to stores via \`--auto-submit\`. |
| **Cost** | Completely free (no Expo subscription required). | Uses your free Expo tier build credits (paid tiers scale up). |`,
  },
  {
    question: "Explain private and public key. Do we need to put anything key etc in Xcode locally? Complete process of Android build and keystore. Local iOS building steps. Store console submission and metadata requirements.",
    answer: `## Public Key vs. Private Key (Asymmetric Cryptography)
Think of it like a secure mailbox:
- The **Public Key** is the mailbox's address. Anyone in the world can see it and drop a letter through the slot. However, once the letter is inside, nobody can pull it back out through the slot.
- The **Private Key** is the physical key. Only you own this key. It is the only thing that can unlock the mailbox to read the letters inside.

**How Apple uses this for Code Signing:**
Your Mac generates a Private Key and a Public Key. You send the Public Key to Apple. Apple wraps it into an official certificate. When you build an app, your computer uses your Private Key to "seal" the code. The user's iPhone uses your Public Key to verify that the seal is unbroken and that the app truly came from you.

## How Xcode Handles Signing Locally (Do you need to input keys?)
No, you do not manually type in keys or passphrases. Xcode automates the entire setup.
When you open a project in Xcode:
1. You log into your Apple ID under Xcode Preferences (Xcode > Settings > Accounts).
2. You check the box that says "Automatically manage signing".
Behind the scenes: Xcode talks to your Mac's built-in security app called Keychain Access. It generates a Private/Public key pair locally on your hard drive, uploads the public key to Apple, fetches a Development Certificate, downlods the Provisioning Profile, and attaches them to the build. You never have to copy-paste a key file.

## Android Build Process & Keystores
On Android, code signing relies on a file called a Keystore (usually named \`user.keystore\` or \`keystore.jks\`). This file holds your private cryptographic key.
- **Can this be done completely on Expo?** Yes. If you build in the EAS Cloud, you never have to generate a keystore on your computer. When you run \`eas build\`, Expo asks: "Do you want us to handle your Android Keystore?" If you choose Yes, Expo’s cloud automatically generates a cryptographically secure keystore, encrypts it, and saves it in your Expo dashboard credentials vault forever.
- **Complete Local Android Build Process (No Cloud):**
  1. Generate a Keystore: Run \`keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias\`. This saves a \`my-release-key.jks\` file on your drive.
  2. Configure Gradle: Link this file path and password inside your project's \`android/app/build.gradle\` file.
  3. Compile: Run \`./gradlew bundleRelease\` inside your \`android\` folder.
  4. Signing: The Android Gradle plugin pulls the private key from your local \`.jks\` file, hashes your code, signs the app, and outputs a production-ready \`.aab\` file.

## Local iOS Building (Without EAS Cloud)
If you are bypassing EAS entirely, you must first generate native folders (\`/ios\`) by running \`npx expo prebuild\`. This converts your project into a Bare Flow project.

**Method 1: Using Xcode Directly (The Standard Way)**
1. Run \`npx expo prebuild\` to generate the \`/ios\` folder.
2. Open the \`/ios/YourProject.xcworkspace\` file inside Xcode.
3. Select your project root in the left sidebar, go to the Signing & Capabilities tab. Select your Development Team and ensure "Automatically manage signing" is checked.
4. In the top toolbar, select Any iOS Device (arm64) as the target.
5. Go to the top menu bar and select Product > Archive.
6. Xcode will compile the app. Once done, the Organizer window opens. Click Distribute App, select App Store Connect, and follow the prompts to sign and upload it straight to Apple.

**Method 2: Command Line using Fastlane (Advanced Automation)**
1. Install Fastlane on your Mac (\`brew install fastlane\`).
2. Run \`fastlane match init\` to set up a private repository for certificates and profiles.
3. Run \`fastlane match appstore\` to generate and download the production profiles to your local machine keychain.
4. Run \`fastlane gym\` in your command line. This triggers Xcode's command-line tools to compile, sign with the local profiles, and export a clean \`.ipa\` file.

## Store Console Submission & Metadata Requirements
Once your code binary is successfully uploaded to the cloud (App Store Connect or Google Play Console), you cannot launch it until you complete a comprehensive storefront checklist manually.

### 🏢 App Store Connect (iOS Checklist)
1. **App Information & Pricing:** Title & Subtitle, Privacy Policy URL, Pricing & Availability.
2. **Store Presence Assets:** Screenshots (6.7" iPhone and 6.5"/5.5" iPhone - up to 10 screenshots each), App Description & Keywords.
3. **App Review Information (Crucial):** Demo Credentials for reviewers to log in, and Contact Info of the developer.
4. **Deployment Tracks (TestFlight):** Internal Testing (up to 100 team members, instant access), External Testing/Beta (up to 10,000 users, requires 12–24h mini-review from Apple).

### 🤖 Google Play Console (Android Checklist)
1. **"Set Up Your App" Dashboard Questionnaire:** App Access (demo accounts), Ads declaration, Content Rating questionnaire (generates PEGI/ESRB rating), Target Audience, Financial Features / Data Safety (massive form detailing data collection).
2. **Store Listing Assets:** App Icon (512x512 PNG), Feature Graphic (1024x500), Screenshots (2-8 phone screenshots, tablet screenshots if applicable), Short & Full Description.
3. **Release Tracks:** Internal Testing, Closed Testing (The 20-Tester Rule: 20 testers opted-in continuously for 14 days before production publishing is allowed), Open Testing (public beta), Production.`,
  }
];
