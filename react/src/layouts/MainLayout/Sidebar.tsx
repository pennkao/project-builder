import { Slider } from '@ark-ui/react';

export default function BasicSlider() {
    return (
        <Slider.Root
            defaultValue={[50]}
            min={0}
            max={100}
            step={1}
            orientation="horizontal"
            className="w-64" // 可用Tailwind或CSS
        >
            <Slider.Label className="block mb-2 text-sm font-medium text-gray-700">Volume</Slider.Label>

            <Slider.ValueText className="text-sm text-gray-500 mb-2" />

            <Slider.Control className="relative h-2 bg-gray-200 rounded">
                <Slider.Track className="absolute h-2 w-full bg-gray-200 rounded" />
                <Slider.Range className="absolute h-2 bg-indigo-500 rounded" />
                <Slider.Thumb index={0} className="block w-4 h-4 bg-indigo-600 rounded-full shadow cursor-pointer">
                    <Slider.HiddenInput />
                </Slider.Thumb>
            </Slider.Control>
        </Slider.Root>
    );
}
